import axios, {AxiosRequestConfig} from 'axios';
import {Alert} from 'react-native';
import Config from 'react-native-config';
import {Strings} from '../i18n';
import {SuccessResponse} from './api.types';
import perf from '@react-native-firebase/perf';

const YelpApi = axios.create({
  baseURL: Config.API_URL,
});

YelpApi.interceptors.request.use(
  async function (config) {
    try {
      config.params = {
        accept: 'application/json',
        ...config.params,
      };
      config.headers.Authorization = `Bearer ${Config.TOKEN}`;
      const httpMetric = await perf().startTrace('axios-request');

      httpMetric.start();
    } finally {
      return config;
    }
  },
  function (error) {
    throw error;
  },
);

axios.interceptors.response.use(
  async function (response) {
    try {
      const httpMetric = await perf().startTrace('axios-response');
      httpMetric.putMetric('http_code', response.status);
      httpMetric.stop();
    } finally {
      return response;
    }
  },
  async function (error) {
    try {
      const {httpMetric} = error.config.metadata;
      httpMetric.setHttpResponseCode(error.response.status);
      httpMetric.setResponseContentType(error.response.headers['Content-Type']);
      await httpMetric.stop();
    } finally {
      return error;
    }
  },
);

export function Api<T>(params: AxiosRequestConfig, showError: boolean = true) {
  return YelpApi.request(params)
    .then(result => {
      const response: SuccessResponse<T> = {
        stat: 'ok',
        data: result.data,
      };
      return response;
    })
    .catch(err => {
      let message = '';
      if (err.response) {
        message =
          err.response.data.error.description ?? Strings.error.responseError;
      } else if (err.request) {
        message = Strings.error.requestError;
      } else {
        message = Strings.error.defaultError;
      }
      showError ? Alert.alert(Strings.error.alertTitle, message) : null;
      throw {
        message,
        stat: 'fail',
        error: err.response?.data.error ?? null,
      };
    });
}

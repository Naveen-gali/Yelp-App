import axios, {AxiosRequestConfig} from 'axios';
import {Alert} from 'react-native';
import Config from 'react-native-config';
import {Strings} from '../i18n';
import {ErrorResponse, SuccessResponse} from './api.types';

const YelpApi = axios.create({
  baseURL: Config.API_URL,
});

YelpApi.interceptors.request.use(
  function (config) {
    config.params = {
      accept: 'application/json',
      ...config.params,
    };
    config.headers.Authorization = `Bearer ${Config.TOKEN}`;
    return config;
  },
  function (error) {
    throw error;
  },
);

export function Api<T>(
  params: AxiosRequestConfig,
  showError: boolean = true,
): Promise<SuccessResponse<T> | ErrorResponse> {
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
      return {
        message,
        stat: 'fail',
        error: err.response.data.error ?? null,
      };
    });
}

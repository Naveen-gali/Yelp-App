import axios, {AxiosRequestConfig} from 'axios';
import {Alert} from 'react-native';
import Config from 'react-native-config';
import {Strings} from '../i18n';

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
): Promise<T> {
  return YelpApi.request(params)
    .then(res => {
      res.data.stat = 'ok';
      return res.data;
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
      };
    });
}

import axios, {AxiosRequestConfig} from 'axios';
import {Alert} from 'react-native';
import Config from 'react-native-config';

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
      return res.data;
    })
    .catch(err => {
      showError
        ? Alert.alert(
            'Error Occured',
            err.response.data.error.description ?? 'Try Again After SomeTime',
          )
        : null;
      err.show_error_screen = !showError;
      err.stat = 'fail';
      if (err.response) {
        err.description =
          err.response.data.error.description ?? 'SomwThing Weird Happened';
        return err;
      } else if (err.request) {
        err.description = 'Bad Network Error!';
        return err.request.data.error;
      } else {
        err.description = 'SomeThing Happened!';
        return err;
      }
    });
}

import axios, {AxiosRequestConfig, Method} from 'axios';
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

YelpApi.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    throw error.response.data;
  },
);

type ApiRequestType = Omit<AxiosRequestConfig, 'url' | 'method'>;

export function Api<T>(
  url: string,
  method: Method,
  params?: ApiRequestType,
): Promise<T> {
  return YelpApi.request({
    url,
    method: method,
    ...params,
  })
    .then(res => {
      console.log('RES API :- ', res);
      return res.data;
    })
    .catch(err => {
      console.log('ERR API :_', err);
      err.show_error_screen = true;
      throw err;
    });
}

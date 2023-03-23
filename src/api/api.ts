import axios from 'axios';
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
    return Promise.reject(error);
  },
);

YelpApi.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export function GetApi<T>(
  location: string,
  sort: string,
  limit: number,
): Promise<T> {
  return YelpApi.get(
    `/search?location=${location}&sort_by=${sort}&limit=${limit}`,
  )
    .then(response => {
      return response;
    })
    .catch(err => {
      return err;
    });
}

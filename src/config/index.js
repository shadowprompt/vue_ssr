import axios from 'axios';
const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'http://127.0.0.1:5050'
    : process.env.NODE_ENV === 'prodDev'
    ? 'https://api.daozhao.com'
    : 'http://127.0.0.1:5050';
const axiosConfig = {
  timeout: 30000,
  baseURL: baseUrl,
  headers: {
    guest: 'Shadow',
  },
};
axios.defaults.headers.guest = 'Shadow';

const instance = axios.create(axiosConfig);
instance.setConfig = (vm) => {
  axios.interceptors.request.use(
    (config) => {
      // Do something before request is sent
      config.headers.guest = 'Shadow'; // 将token放到请求头发送给服务器
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  instance.interceptors.response.use((response) => {
    // Do something with response data
    setTimeout(() => {
      // 请求成功后关闭loading状态
      vm.$store.dispatch('toggleLoading', false);
    }, 0);
    return response;
  });
};

export { instance as axios };

export const config = {
  URL: baseUrl,
  static: {
    siteName: '道招',
    siteDes: '关注互联网|聚焦Web',
    siteUrl: 'https://www.daozhao.com',
  },
};

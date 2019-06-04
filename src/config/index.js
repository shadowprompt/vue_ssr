import axios from 'axios';
// const baseUrl =
  // process.env.NODE_ENV === 'production' ? 'https://www.daozhao.com.cn' : '/api';
// const baseUrl = 'https://www.daozhao.com.cn';
const baseUrl = 'http://localhost:5050';
const axiosConfig = {
  timeout: 30000,
  baseURL: baseUrl,
  headers: {
    guest: 'Shadow',
  }
};
axios.defaults.headers.guest = 'Shadow';

const instance = axios.create(axiosConfig);
instance.setConfig = (vm) => {
  axios.interceptors.request.use((config) => {
    // Do something before request is sent
    config.headers.guest = 'Shadow';    //将token放到请求头发送给服务器
    console.log(' url -> ', config.request.url);
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
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

const config = {
  URL: baseUrl,
  static: {
    websiteName: '道招',
  },
};
export { config };

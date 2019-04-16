import axios from 'axios';
// const baseUrl =
  // process.env.NODE_ENV === 'production' ? 'https://www.daozhao.com.cn' : '/api';
const baseUrl = 'https://www.daozhao.com.cn';
const axiosConfig = {
  timeout: 30000,
  baseURL: baseUrl
};

const instance = axios.create(axiosConfig);
instance.setConfig = (vm) => {
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

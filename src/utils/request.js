import axios from 'axios';

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    baseURL: 'http://114.55.37.219:8081',
    timeout: 5000,
    ContentType: 'application/json/UTF-8',

});

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject(error);
        }
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

export default service;

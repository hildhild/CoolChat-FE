import axios from 'axios';

const instance = axios.create({ //Tạo 1 instance cua axios để có thể tùy chỉnh như timeout, headers,...
    baseURL: import.meta.env.VITE_API_CORE_ENDPOINT

});

instance.interceptors.request.use(function (config) {
    const token = localStorage.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) { //Máy chặn yêu cầu hoặc phản hồi trước khi nó được xử lý => Đây là chặn response
    return response.data; //trả về response.data
  }, function (error) {
    let res = {}
    if (error.response){
        res.data = error.response.data;
        res.status = error.response.status;
        res.headers = error.response.headers;
    } else if (error.request) {
        console.log(error.request);
    } else {
        console.log('Error: ', error.message);
    }
    return res;
});

export default instance;
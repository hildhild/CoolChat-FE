import axios from 'axios';
import { toast } from 'react-toastify';
import store from '../store/store.jsx';
import { setToken } from '../store/slices/UserSlice.jsx';
import { errors } from '../constants/errors.jsx';

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
    return response; //trả về response.data
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
    console.log(1, res);
    if (res.data?.errors && res.data?.errors.length > 0 && (res.data?.errors[0] === "Given token not valid for any token type" || res.data.errors[0] === "Authentication credentials were not provided.")) {
        store.dispatch(setToken(""));
        localStorage.removeItem("token");
    } else if (res.data?.errors && res.data?.errors.length > 0) {
        toast.error(res.data?.errors[0] ? res.data?.errors[0] : "Đã xảy ra lỗi");
    } else if (res.data?.error) {
        toast.error(res.data?.error ? res.data?.error : "Đã xảy ra lỗi");
    } else {
        toast.error("Lỗi không xác định")
    }
    return res;
});

export default instance;
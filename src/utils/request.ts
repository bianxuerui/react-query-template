import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// 创建axios实例
const instance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 请求拦截器
instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 在发送请求之前做些什么
        const token = localStorage.getItem('token');
        if (token) {
            config.headers = config.headers || {};
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 响应拦截器
instance.interceptors.response.use(
    (response: AxiosResponse) => {
        // 对响应数据做点什么
        return response;
    },
    (error) => {
        // 对响应错误做点什么
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 处理未授权错误
                    // 例如：重定向到登录页面
                    break;
                case 403:
                    // 处理禁止访问错误
                    break;
                case 404:
                    // 处理资源不存在错误
                    break;
                default:
                    // 处理其他错误
                    break;
            }
        }
        return Promise.reject(error);
    }
);

// 封装GET请求
export const get = <T>(url: string, params?: any): Promise<T> => {
    return instance.get(url, { params });
};

// 封装POST请求
export const post = <T>(url: string, data?: any): Promise<T> => {
    return instance.post(url, data);
};

// 封装PUT请求
export const put = <T>(url: string, data?: any): Promise<T> => {
    return instance.put(url, data);
};

// 封装DELETE请求
export const del = <T>(url: string): Promise<T> => {
    return instance.delete(url);
};

export default instance;

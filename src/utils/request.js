import axios from "axios";
import config from '../config';
import { CacheUtil } from "./cache";
import { Message } from "../components/message";


function retryAdapterEnhancer(adapter, options) {
    const { times = 0, delay = 300 } = options;

    return async (configure) => {
        const { retryTimes = times, retryDelay = delay } = configure;
        let __retryCount = 0;
        const request = async () => {
            try {
                return await adapter(configure);
            } catch (err) {
                if (!retryTimes || __retryCount >= retryTimes) {
                    return Promise.reject(err);
                }
                __retryCount++;
                const delay = new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, retryDelay);
                });
                return delay.then(() => {
                    return request();
                });
            }
        };
        return request();
    };
}


const createInstance = axios.create({
    baseURL: config.govern_host + config.govern_api,
    timeout: 3000,
    params: {
    },
    adapter: retryAdapterEnhancer(axios.defaults.adapter, {
        retryDelay: 300
    }),
});


createInstance.interceptors.request.use(
    configure => {
        const cacheUtil = new CacheUtil();
        const token = cacheUtil.getExpire('token') || '';
        if(token){
            configure.headers.token= token
        }
        return configure
    },
        error => {
            Message.error(error);
            return Promise.reject(error)
    }
)


createInstance.interceptors.response.use(
    response => {
        // console.log('response fulfill: ', response);
        if (response.data.errorCode !== 0 ) {
            Message.error(response.data.msg);
            return Promise.reject(response.data.msg);
        }
        return response.data;
    },
    error => {
        if (error.response.status === 401) {
            Message.error(error.response.data.msg, 1000);
            localStorage.removeItem('token');
            setTimeout(() => {
                window.location.hash='#/login';
            }, 1000)
        } else {
            Message.error(error.response.data.msg);
            return Promise.reject(error.response.data.msg)
        }
    }
);

export default createInstance;
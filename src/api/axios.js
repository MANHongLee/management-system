//构建一个axios的工具类

//引入axios
import axios from "axios";
//引入项目的相关配置文件
import config from "../config";

//对当前的环境变量进行判断
const baseUrl = process.env.NODE_ENV === "development" ? config.baseUrl.dev : config.baseUrl.pro;

class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    //方法：定义axios的相关配置
    getInsideConfig() {
        //配置基础的配置对象，用于创建axios实例时引入
        const config = {
            //该baseUrl为判断环境所得到的地址
            baseUrl: this.baseUrl,
            headers: {}
        }
        return config;
    }

    //方法：拦截器用于拦截请求前或接收后的数据处理
    interceptors(instance) {
        // 添加请求拦截器
        instance.interceptors.request.use(function (config) {
            // 在发送请求之前做些什么
            return config;
        }, function (error) {
            // 对请求错误做些什么
            return Promise.reject(error);
        });

        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
            // 对响应数据做点什么
            console.log("response:"+ response);
            return response;
        }, function (error) {
            // 对响应错误做点什么
            console.log("error:"+ error);
            return Promise.reject(error);
        });
    }

    //方法：接口请求时，进行调用的函数,option为传入的配置或请求的参数
    request (options){
        //axios的实例的创建
        const instance = axios.create();
        //对基础的配置以及传入的option参数进行解构赋值，并合并成为新的option配置
        options = {...this.getInsideConfig(), ...options};
        //调用拦截器
        this.interceptors(instance);
        return instance(options);
    }
}

//对外暴露HttpRequest类实例
export default new HttpRequest(baseUrl);


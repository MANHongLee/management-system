//所有的接口请求 均写在该文件下

//引入所写好的工具类axios

import axios from "../api/axios";

//接口调用 , parmas为接口调用传入的参数
export const getMenu = (params) => {
    return axios.request({
        url: '/data/getMenu',
        method: 'POST',
        data: params,
    })
}

export const getData = () => {
    return axios.request({
        url: '/home/getData',
        method: 'GET',
        // data: params,
    })
}
export const getTableData = () => {
    return axios.request({
        url: '/data/getTableData',
        method: 'Get',
    })
}
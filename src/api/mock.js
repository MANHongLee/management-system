//配置mock的配置文件

import Mock from 'mockjs';
//引入home页面的mock数据模拟函数
import homeApi from '../api/mockServerData/home'
import tableDataApi from '../api/mockServerData/tableData'

 Mock.mock('/home/getData', homeApi.getStatisticalData);
 Mock.mock('/data/getTableData', tableDataApi.getTableData);
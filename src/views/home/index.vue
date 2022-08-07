<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImgUrl" alt="个人头像" />
          <div class="user-info">
            <p class="name">Liminkang</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登陆的时间：<span>2022年7月12日</span></p>
          <p>上次登陆的地点：<span>广州市</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="margin-top: 20px; height: 355px">
        <el-table :data="tableData" height="320">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <div class="num">
        <el-card
          v-for="(item, index) in countData"
          :index="index"
          :key="item.name"
          :body-style="{ display: 'flex', padding: '0' }"
          shadow="hover"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="`background: ${item.color}`"
          ></i>
          <div class="detail">
            <p class="num">¥{{ item.value }}</p>
            <p class="txt">¥{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 240px" shadow="hover">
        <!-- <div style="height: 240px" ref="lineEcharts"></div> -->
        <echart
          :isAxisEcharts="true"
          :inComingOptionData="echartsData.user"
          style="height: 240px"
        />
      </el-card>
      <div class="graph">
        <el-card style="height: 200px" shadow="hover">
          <div style="height: 200px" ref="userEcharts"></div>
        </el-card>
        <el-card style="height: 200px" shadow="hover">
          <!-- <div style="height: 200px" ref="videoEcharts"></div> -->
          <echart
            :isAxisEcharts="false"
            :inComingOptionData="echartsData.view"
            style="height: 200px"
          />
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getMenu, getData } from "../../api/data";

//这是5版本以上的echarts的引入方式
import * as echarts from "echarts";

import Echart from "../../components/Echarts.vue";

export default {
  name: "home",
  components: { Echart },
  data() {
    return {
      userImgUrl: require("../../assets/images/user.png"),
      tableData: [],
      tableLabel: {
        name: "品牌",
        todayBuy: "今日售出",
        monthBuy: "今月售出",
        totalBuy: "整体售出",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      echartsData: {
        user: {
          xAxis: [],
          legend: [],
          series: [],
        },
        order: {
          xAxis: [],
          legend: [],
          series: [],
        },
        view: {
          legend: [],
          series: [],
        },
      },
    };
  },
  methods: {},
  mounted() {
    //接口请求,获取home页面的各种数据
    getData().then((res) => {
      // console.log(res);
      console.log(res.data);
      const { code, data } = { ...res.data };
      if (res.status === 200) {
        if (code === 20000) {
          this.tableData = data.tableData;

          //处理折线图lineEcharts数据
          const orderData = data.orderData;
          //设置需要的图例对应的labelArray数组
          const labelArray = Object.keys(orderData.data[0]);
          console.log(labelArray);
          //设置对应图例的series数据
          // const series = [];
          // labelArray.forEach((key) => {
          //   series.push({
          //     name: key,
          //     type: "line",
          //     data: orderData.data.map((item) => item[key]),
          //   });
          // });
          // console.log(series);
          // console.log(orderData.date);
          //配置lineEcharts图表的options配置
          // const options = {
          //   tooltip: {
          //     // trigger: 'axis',
          //   },
          //   legend: {
          //     data: labelArray,
          //   },
          //   xAxis: {
          //     data: orderData.date,
          //   },
          //   yAxis: {},
          //   series,
          // };

          this.echartsData.user.xAxis = orderData.date;
          console.log(orderData.data);
          this.echartsData.user.legend = labelArray;
          labelArray.forEach((key) => {
            this.echartsData.user.series.push({
              name: key,
              type: "line",
              data: orderData.data.map((item) => item[key]),
            });
          });
          //通过$refs获取容器为图表的绘制空间
          // const lineEcharts = echarts.init(this.$refs.lineEcharts);
          //使用制定的数据项options配置对应的图表
          // lineEcharts.setOption(options);

          //处理user柱状图
          const userData = data.userData;
          //X轴上的日期
          const dateLabel = userData.map((item) => item.date);
          //user柱状图图例
          const userLegends = ["新增用户", "活跃用户"];
          console.log(userData.map((item) => item.new));
          const userSeries = [
            {
              name: userLegends[0],
              type: "bar",
              data: userData.map((item) => item.new),
            },
            {
              name: userLegends[1],
              type: "bar",
              data: userData.map((item) => item.active),
            },
          ];
          const userEchartsOptions = {
            tooltip: {
              trigger: "axis",
            },
            legend: {
              data: userLegends,
              textStyle: {
                color: "#333",
              },
            },
            xAxis: {
              data: dateLabel,
            },
            yAxis: {},
            series: userSeries,
          };
          const userEcharts = echarts.init(this.$refs.userEcharts);
          userEcharts.setOption(userEchartsOptions);

          //处理videoEcharts饼图
          const videoData = data.videoData;
          // const videoSeries = [
          //   {
          //     type: "pie",
          //     data: [],
          //     label: { position: "inside", fontSize: "10px" },
          //   },
          // ];
          // videoData.forEach((key) => {
          //   videoSeries[0].data.push(key);
          // });
          // console.log(videoSeries);
          // const videoEchartsOptions = {
          //   tooltip: {
          //     tooltip: "item",
          //   },
          //   legend: {
          //     //orient指的是朝向，vertical指的是垂直
          //     orient: "vertical",
          //     left: "left",
          //     data: videoData.map((item) => item.name),
          //   },
          //   series: videoSeries,
          // };
          this.echartsData.view.legend = videoData.map((item) => item.name);
          // console.log(this.echartsData.view.legend);
          this.echartsData.view.series = [
            {
              type: "pie",
              data: videoData,
              label: { position: "inside", fontSize: "10px" },
            },
          ];
          // console.log(this.echartsData.view.series);
          // const videoEcharts = echarts.init(this.$refs.videoEcharts);
          // videoEcharts.setOption(videoEchartsOptions);
        }
      }
    });
  },
};
</script>

<style>
</style>
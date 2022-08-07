<template>
  <div ref="echarts"></div>
</template>

<script>
// 二次封装Echarts为公共组件

import * as Echarts from "echarts";
export default {
  props: {
    isAxisEcharts: {
      type: Boolean,
      default: true,
    },
    inComingOptionData: {
      type: Object,
      default() {
        return {
          xAxis: [],
          legend: [],
          series: [],
        };
      },
    },
  },
  data() {
    return {
      axisOptionData: {
        tooltip: {},
        legend: {
          data: [],
        },
        xAxis: {
          data: [],
        },
        yAxis: {},
        series: [],
      },
      pieOptionData: {
        tooltip: {
          tooltip: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: [],
        },
        series: [],
      },
      isecharts: null,
    };
  },
  methods: {
    //对出入进来的数据进行处理
    handelOptionData (){
        if(this.isAxisEcharts){
            // this,axisOptionData.tooltip = this.inComingOptionData.
            this.axisOptionData.legend.data = this.inComingOptionData.legend;
            this.axisOptionData.xAxis.data = this.inComingOptionData.xAxis;
            this.axisOptionData.series = this.inComingOptionData.series;
        }else{
            this.pieOptionData.legend.data = this.inComingOptionData.legend;
            this.pieOptionData.series = this.inComingOptionData.series;
        }
    },
    //对echarts图表进行初始化并绘制
    initEcharts (){
        this.handelOptionData();
        if(this.isecharts) {
            this.isecharts.setOption(this.whichOption);
        }else{
            this.isecharts = Echarts.init(this.$refs.echarts)
            this.isecharts.setOption(this.whichOption);
        }
    }
  },
  watch: {
    inComingOptionData: {
        handler: function() {
            this.initEcharts();
        },
        deep: true, 
    }
  },
  computed: {
    //选择对应的echarts数据进行传入
    whichOption() {
        return this.isAxisEcharts ? this.axisOptionData : this.pieOptionData;
    }
  },
};
</script>

<style lang="less" scoped>
</style>
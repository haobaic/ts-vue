<template>
  <div ref="mychart" class="chart" :style="{width:chartWidth,height:chartHeight}"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide } from "vue-property-decorator";
import echarts from "echarts";
import "echarts/map/js/china.js";
import jsonp from "jsonp";
@Component
export default class Charts extends Vue {
  // 图表类型 line/bar/pie
  @Prop({ type: String, default: "line" }) readonly chartType!: String;
  @Prop(Object) chartData!: string | null;
  @Provide() mapData: String[];
  @Provide() chartWidth: string = "";
  @Provide() chartHeight: string = "";
  @Provide() mychart: any;
  created() {
    this.generatorWidthAndHeight();
    
  }

  generatorWidthAndHeight() {
    // 图表生成宽度和高度
    this.chartWidth = `${document.body.offsetWidth * 0.8}px`;
    this.chartHeight = `${document.body.offsetHeight * 0.6}px`;
  }
  mounted() {
    // 1 实例echarts对象
    (this as any).mychart = echarts.init((this as any).$refs.mychart as HTMLCanvasElement);
    
    this.drawChart();
    
  }
  getData() {
        // let url="https://huiyan.baidu.com/openapi/v1/migration/rank?type=move&ak=kgD2HiDnLdUhwzd3CLuG5AWNfX3fhLYe&adminType=country&name=%E5%85%A8%E5%9B%BD"
    let url =
      "https://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427&callback=__jp0";
    jsonp(url, {}, (err, data) => {
      if (!err) {
        //代表数据请求成功
        (this as any).mapData = data.data.list.map(item => ({
          name: item.name,
          value: item.value
        }));
        (this as any).generatorMapOption()
      }
    });
  }
  drawChart() {
    
    if ((this as any).mychart == undefined) {
      console.log(`echarts init dom is failed`);
      return;
    }
    switch (this.chartType) {
      case "line":
        (this as any).mychart.setOption((this as any).generatorLineOption());
        break;
      case "bar":
        (this as any).mychart.setOption((this as any).generatorBarOption());
        break;
      case "pie":
        (this as any).mychart.setOption((this as any).generatorPieOption());
        break;
      case "map":
          (this as any).getData();
        (this as any).mychart.setOption((this as any).generatorMapOption());
        break;
      // default:
      //   console.log(`chartType ${this.chartType} is invalid`);
      //   break;
    }
  }
  generatorLineOption() {
    // 绘制折线图
    return {
      title: {
        text: "近一周学习量",
        subtext: "test",
        x: "center"
      },
      xAxis: {
        type: "category",
        data: (this as any).chartData.xAxisData
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: (this as any).chartData.yAxisData,
          type: "line",
          smooth: true
        }
      ],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985"
          }
        }
      }
    };
  }

  generatorBarOption() {
    return {
      title: {
        text: "近一周学习量",
        subtext: "test",
        x: "center"
      },
      xAxis: {
        type: "category",
        data: (this as any).chartData.xAxisData
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: (this as any).chartData.yAxisData,
          type: "bar",
          barWidth: "20%"
        }
      ],
      color: ["#3398DB"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "5%"
      }
    };
  }

  generatorPieOption() {
    // 处理数据
    let pieData = [];
    for (const index in (this as any).chartData.xAxisData) {
      pieData.push({
        value: (this as any).chartData.yAxisData[index],
        name: (this as any).chartData.xAxisData[index]
      });
    }

    return {
      title: {
        text: "近一周学习量",
        subtext: "test",
        x: "center"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: (this as any).chartData.xAxisData
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: pieData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
  }

  generatorMapOption() {
    //   疫情图
    const option = {
      title: {
        text: "中国地图",
        link: "https://renjinhui.github.io/review_vue/dist/index.html#/yqdt",
        subtext: "不是最新数据,模拟效果",
        sublink: "https://renjinhui.github.io/review_vue/dist/index.html#/yqdt"
      },
      series: [
        {
          name: "确诊人数",
          type: "map", //显示什么类型
          map: "china", //渲染中国地图
          label: {
            show: true,
            color: "#000", //控制地区名字字体颜色
            fontSize: 10
          },
          itemStyle: {
            areaColor: "#eee", //地图显示颜色
            borderColor: "#000" //地图边框色
          },
          zoom: 1.2, //控制地图放大缩小
          // roam: true,//放大缩小
          emphasis: {
            //控制鼠标划过之后的背景色和字体颜色
            label: {
              color: "#000",
              fonstSize: 12
            },
            itemStyle: {
              areaColor: "#eee"
            }
          },
          data: (this as any).mapData //用来展示后台给的数据
        }
      ],
      visualMap: [
        {
          type: "piecewise",
          show: true,
          // splitNumber:4,
          pieces: [
            //分段
            {
              min: 10000
            }, // 不指定 max，表示 max 为无限大（Infinity）。
            {
              min: 1000,
              max: 9999
            },
            {
              min: 100,
              max: 999
            },
            {
              min: 10,
              max: 99
            },
            {
              min: 1,
              max: 9
            } // 表示 value 等于 123 的情况。。
          ],
          align:"right",//默认left
          orient:"vertical",//水平（'horizontal'）或者竖直（'vertical'）
          inRange: {
            symbol: "rect",
            color: ["#ffc0b1", "#9c0505"] //左边那几个点的颜色
          },
          itemWidth: 30,
          temHeight: 10
        }
      ],
      tooltip: {
        trigger: "item"
      },
      toolbox: {
        show: true,
        orient: "vertical",
        left: "right",
        top: "center",
        feature: {
          dataView: {
            readOnly: false
          },
          restore: {},
          saveAsImage: {}
        }
      }
    };
    (this as any).mychart.setOption(option)
    return option;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>

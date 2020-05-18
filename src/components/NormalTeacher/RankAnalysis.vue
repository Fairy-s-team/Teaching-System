<template>
  <div id="rank">
    <el-card>
      <div id="myChart"></div>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import store from '@/store';

export default {
  name: "RankAnalysis",
  data() {
    return {
      tableData: [],
      questions: [],
      teacherId: store.state.loginData.userId,
      courses: [],
      // series的数据
      dataSeries: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      // 获取六个问题
      axios
        .get("http://localhost:8080/question")
        .then(response => {
          for(var i=0; i < response.data.length; i++) {
            this.questions.push(response.data[i].question);
          }
          console.log(this.questions);
        })
        .catch(error => {
            console.log(error);
        });
      // 获取老师的评价
      axios
        .get("http://localhost:8080/api/rank/average/"+this.teacherId)
        .then(response => {
          console.log("评价信息：");
          this.tableData = response.data;
          console.log(this.tableData);

          for (var j=0; j < this.tableData.length; j++) {
            var temp = [];
            temp.push(this.tableData[j].rankQ1);
            temp.push(this.tableData[j].rankQ2);
            temp.push(this.tableData[j].rankQ3);
            temp.push(this.tableData[j].rankQ4);
            temp.push(this.tableData[j].rankQ5);
            temp.push(this.tableData[j].rankQ6);
            var obj = {
              type: "bar",
              name: "",
              data: []
            }
            obj.name = this.tableData[j].courseName;
            obj.data = temp;
            this.dataSeries.push(obj);

            this.courses.push(this.tableData[j].courseName);
          }
          console.log(this.questions);

          // 调用绘制图表的方法
          this.draw();
        })
        .catch(error => {
            console.log(error);
        });
    },
    draw() {
      // 实例化echarts对象
      let myChartDrawer = this.$echarts.init(
        document.getElementById("myChart")
      );

      // 绘制条形图
      var option = {
        title: {
          text: "学生的评价",
          top: 5,
          left: "center"
        },
        legend: {
          data: this.courses,
          top: 30
        },
        grid: {bottom:'30%'},
        // X轴
        xAxis: {
          type: "category",
          data: this.questions,
          axisLabel: {
            interval:0,
            rotate:30
          }
        },
        // Y轴
        yAxis: {
          type: "value",
        },
        // 数据
        series: this.dataSeries
      };
      myChartDrawer.setOption(option);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../../assets/css/normalteacher.css";
</style>

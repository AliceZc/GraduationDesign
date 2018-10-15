<template>
    <div class="chart">
        <el-card shadow="always">        
            <div id="chartColumn" style="width:100%; height:400px;">
                
            </div>    
        </el-card>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import axios from 'axios'
    export default {
        data() {
            return {
                chartColumn: null,
                chartBar: null,
                chartLine: null,
                chartPie: null,

            }
        },
        async created () {
           
        },
        methods: {
            async drawColumnChart() {
                const modules = {
                    modules: 
                        ['萌新报道','聊天灌水区','交流伸手','新番讨论',
                        '动漫资源','完结动漫','社友手绘','漫友杂图',
                        '游戏资讯','新作介绍区','东方Project','ACG游戏专区',
                        '论坛事务','人才招聘']
                } 
                
                const {data} = await axios.post(`/api/topicCount`,modules)
                const hh = data
                this.chartColumn = echarts.init(document.getElementById('chartColumn'));
                this.chartColumn.setOption({
                  title: { text: 'num of modules' },
                  tooltip: {},
                  xAxis: {
                      data: ['萌新','聊天','交流','新番',
                '动漫','完结','社友','漫友',
                '游戏','新作','东方','ACG',
                '论坛','人才']
                  },
                  yAxis: {},
                  series: [{
                      name: 'num',
                      type: 'bar',
                      data: hh
                    }]
                });
            },
            drawCharts() {
                this.drawColumnChart()
            },
        },

        mounted: function () {
            this.drawCharts()
        },
        updated: function () {
            this.drawCharts()
        }
    }
</script>

<style scoped>
    .chart {
        padding: 40px;
    }
    .chart-container {
        width: 100%;
        float: left;
    }
    /*.chart div {
        height: 400px;
        float: left;
    }*/

    .el-col {
        padding: 30px 20px;
    }
</style>

/**
 * Created by Administrator on 2017/9/24.
 */
define(['jquery','util','echarts'], function ($,util,echarts) {
    // console.log(123);
    // 设置导航菜单选中（左侧边栏选中高亮效果）
    util.setMenu(location.pathname);

    // 处理图表显示
    // 基于准备好的dom，初始化echarts实例
    // var myChart = echarts.init(document.getElementById('main')); 本行可以替换成以下2行代码
    // get(0) --> 得到的是原生DOM对象  eq(0)--> 得到的是jQuery对象
    var container = $('#main').get(0);
    var myChart = echarts.init(container);

    // 指定图表的配置项和数据 --> 百度文档写的很详细（开源项目）
    var option = {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
});

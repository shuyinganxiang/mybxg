/**
 * Created by Administrator on 2017/9/27.
 */
define(['jquery','template','util'], function ($,template,util) {
    // 设置导航选中
    util.setMenu('/course/add');

    // 获取课程id
    var csId = util.qs('cs_id');
    // 获取所有的课程列表数据
    $.ajax({
        type: 'get',
        url: '/api/course/lesson',
        data:{cs_id:csId},
        dataType:'json',
        success: function (data) {
            // console.log(data);
            var html = template('lessonTpl',data.result);
            $('#lessonInfo').html(html);
        }
    });

});
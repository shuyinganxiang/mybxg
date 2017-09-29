/**
 * Created by Administrator on 2017/9/27.
 */
define(['jquery','template','util','bootstrap'], function ($,template,util) {
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
            // 解析数据，渲染页面
            var html = template('lessonTpl',data.result);
            $('#lessonInfo').html(html);
            // 处理添加课时操作
            $('#addlesson').click(function () {
                // console.log('打印成功');
                // 解析数据，渲染模态框
                var html = template('modalTpl',{operate: '添加课时'});
                $('#modaInfo').html(html);
                // 1、显示弹窗 --->引入bootstrap 因为是jQuery插件，基于jQuery做的
                $('#chapterModal').modal();
            });
            // 处理课程编辑操作
            $('.editLesson').click(function () {
                // 获取课时id
                var ctId = $(this).attr('data-ctId');
                $.ajax({
                    type: 'get',
                    url: '/pai/cuorse/chapter/edit',
                    data: {ct_id: ctId},
                    dataType: 'json',
                    success:function(data){
                        // console.log(data);
                        // 解析数据，渲染模态框
                        data.result.operate= '编辑课时';
                        var html = template('modalTpl',data.result);
                        $('#modaInfo').html(html);
                        // 显示模态框
                        $('#chapterModal').modal();
                    }
                });


            });
        }
    });

});
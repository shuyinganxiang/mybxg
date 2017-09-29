/**
 * Created by Administrator on 2017/9/27.
 */
define(['jquery','template','util','bootstrap','form'], function ($,template,util) {
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
                // 处理添加课时的表单提交 --> 引入表单提交插件 form
                // 先把之前绑定的事件取消，然后重新绑定   .unbind('click')
                $('#addOrEditBtn').click(function () {
                    $('#lessonForm').ajaxSubmit({
                        type: 'post',
                        url: '/api/course/chapter/add',
                        data:{ct_cs_id: csId},
                        dataType: 'json',
                        success: function (data) {
                            if(data.code==200){
                                location.reload();
                            }
                        }
                    });
                });
            });
            // 处理课程编辑操作
            $('.editLesson').click(function () {
                // 获取课时id
                var ctId = $(this).attr('data-ctId');
                $.ajax({
                    type: 'get',
                    url: '/api/course/chapter/edit',
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
                        // 处理编辑课时的表单提交  .unbind('click')
                        $('#addOrEditBtn').click(function () {
                            $('#lessonForm').ajaxSubmit({
                                type: 'post',
                                url: '/api/course/chapter/modify',
                                data:{ct_cs_id: csId,ct_id: ctId},
                                dataType: 'json',
                                success: function (data) {
                                    if(data.code==200){
                                        location.reload();
                                    }
                                }
                            });
                        });
                    }
                });


            });
            // 处理添加和编辑讲师的表单提交

        }
    });

});
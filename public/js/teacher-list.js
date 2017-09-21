/**
 * Created by Administrator on 2017/9/20.
 */
define(['jquery','template'],function ($,template) {
    // 调用后台接口，获取所有讲师数据
    $.ajax({
        type: 'get',
        url: '/api/teacher',
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            // 解析数据，渲染页面
            var html = template('teacherTpl',{list:data.result});
            $('#teacherInfo').html(html);

            // 启用和注销功能
            $('.eod').click(function () {
                // 当前点击的按钮
                var that =  this; // 当前点击的按钮
                // console.log(123);
                //var td = $(this).parent();
                // closest() 方法，查找离他最近的父元素
                var td = $(this).closest('td');
                // console.log(td);
                var tcId = td.attr('data-tcId');
                // console.log(tcId);
                // console.log(td);
                var tcStatus = td.attr('data-status');
                console.log(tcStatus);

                // 调接口
                $.ajax({
                    type: 'post',
                    url: '/api/teacher/handle',
                    data:{tc_id: tcId,tc_status: tcStatus},
                    dataType: 'json',
                    success: function (data) {
                        // console.log(data);
                        // 修改状态
                        if(data.code == 200){
                            td.attr('data-status',data.result.tc_status);
                            if(data.result.tc_status == 0){
                                $(that).text('启用');
                            }else{
                                $(that).text('注销');
                            }
                        }
                    }
                });
            });


        }

    });
});
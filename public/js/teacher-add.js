/**
 * Created by Administrator on 2017/9/21.
 */
define(['jquery','template','util','datepicker','language'], function ($,template,util) {
    //console.log(location.search);
    // 获取url中的参数

    // 以下注释得到代码，已被封装到工具js中
    /*var param = location.search.substr(1);
    var tcId = null;
    if(param){
        var params = param.split('&');
        $.each(params, function (i,item) {
            // console.log(item);
            var kv = item.split('=');
            if(kv[0] == 'tc_id'){
                tcId = kv[1];
                return false; // 终止each循环，js中的forEach循环不可以终止，只能遍历到最后
            }
        });
        console.log(tcId);
    }*/

    var tcId = util.qs('tc_id');
     console.log(tcId);
    if(tcId){
        // 编辑操作
        $.ajax({
            type: 'get',
            url: '/api/teacher/edit',
            data: {tc_id: tcId},
            dataType: 'json',
            success: function (data) {
                 console.log(data);
                // 解析数据，渲染页面
                data.result.operate = '编辑讲师';
                var html = template('teacherTpl',data.result);
                $('#teacherInfo').html(html);

                // 调用
                submitForm('/api/teacher/update');
            }
        });
    }else{
        // 添加操作
        // 解析数据，渲染页面
        var html = template('teacherTpl',{operate:'添加讲师'});
        $('#teacherInfo').html(html);
        // 调用
        submitForm('/api/teacher/add');
    }

    // 提交表单
    function submitForm(url){
        $('#teacherBtn').click(function () {
            // 发请求操作
            $.ajax({
                type: 'post',
                url: url,
                data: $('#teacherForm').serialize(),
                success: function (data) {
                    if(data.code == 200){
                        location.href = '/teacher/list';
                    }
                }
            });
        });

    }


});
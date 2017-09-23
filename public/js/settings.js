/**
 * Created by Administrator on 2017/9/23.
 */
define(['jquery','template'], function($,template) {
    // 调用接口,获取所有的个人信息
    $.ajax({
        type: 'get',
        url: '/api/teacher/profile',
        dataType: 'json',
        success: function(data) {
            // console.log(data);
            // 解析数据、渲染页面
            var html = template('settingsTpl',data.result);
            $('#settingsInfo').html(html);
        }

    });
});
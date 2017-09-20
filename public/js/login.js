/**
 * Created by Administrator on 2017/9/20.
 */

// cookie 没有返回值，它是一个jQuery的插件，方法作用于jQuery原型上或$上
define(['jquery','cookie'], function ($) {
    // 实现登录功能
    $('#loginBtn').click(function () {
        //console.log(123);
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $('#loginFrom').serialize(),
            dataType: 'json',
            success: function (data) {
                //console.log(data);
                if(data.code==200){
                    // 存储用户登陆后的信息
                    $.cookie('loginInfo',JSON.stringify(data.result),{path:'/'});
                    // 登录成功，跳转到主页面
                    location.href = '/main/index';
                }
            }
        });
        return false; // 组织默认行为、组织冒泡（jQuery）； 原生js中，只组织默认行为
    });
});
/**
 * Created by Administrator on 2017/9/24.
 */
define(['jquery','template','util','form'], function ($,template,util) {
    // 设置导航菜单栏选中
    util.setMenu(location.pathname);

    // 绑定事件
    $('#courseBtn').click(function () {
        // 调用接口，获取要添加的数据
        $('#courseForm').ajaxSubmit({
            type: 'post',
            url: '/api/course/create',
            dataType: 'json',
            success: function (data) {
                // console.log(data);
                if(data.code==200){
                    location.href='/course/basic?cs_id='+data.result.cs_id;
                }
            }
        });
    });


});
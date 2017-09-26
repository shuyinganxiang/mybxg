/**
 * Created by Administrator on 2017/9/26.
 */
define(['jquery','template','util','uploadify'], function ($,template,util) {
    // 设置导航菜单选中
    util.setMenu('/course/add');

    // 获取课程ID
    var csId = util.qs('cs_id');
    // 查询课程封面信息
    $.ajax({   // ajax 请求
        type: 'get', // 请求方式
        url: '/api/course/picture', // 要请求的url地址
        data: {cs_id:csId},
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            // 解析数据 渲染页面
            var html = template('pictureTpl',data.result);
            $('#pictureInfo').html(html);

            // 处理封面上传操作  添加依赖 uploadify
            /*$("#myfile").uploadify({
                // 月姐姐
                width: 80,
                height: 'auto',
                buttonText: "选择图片",
                buttonClass: "btn btn-success btn-sm",

                swf: '/public/assets/uploadify/uploadify.swf',
                itemTemplate: '<span></span>',
                uploader: '/api/uploader/cover',
                fileObjName: 'cs_cover_original',
                formData: {cs_id: csId},
                onUploadSuccess: function (a, b) {
                    //console.log(b);
                    var obj = JSON.parse(b);
                    $('.preview img').attr('src', obj.result.path);
                }
            });*/

            $('#myfile').uploadify({
                width: 80,
                height: 'auto',
                buttonText: '选择图片', // 按钮上的文字
                buttonClass:'btn btn-success btn-sm',    // 按钮的样式
                itemTemplate: '<span></span>', // 去掉上传图片的字

                swf: '/public/assets/uploadify/uploadify.swf',
                uploader: '/api/uploader/cover',
                fileObjName: 'cs_cover_original',  // 指定上传名称
                formData: {cs_id: csId},   // 传递除图片以外的数据
                onUploadSuccess: function (a,b) { // 此处可以传递三个参数，我们需要的是第二个
                    // console.log(b);
                    var obj = JSON.parse(b); // 把字符串转成json格式
                    $('.preview img').attr('src', obj.result.path); // 将图片路径放进图片区域的属性中
                }
            });
        }

    });
});

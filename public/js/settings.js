/**
 * Created by Administrator on 2017/9/23.
 */
define(['jquery','template','ckeditor','uploadify','region','datepicker','language'], function($,template,CKEDITOR) {
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

            // 处理头像上传，必须写在回调函数里面
            $('#upfile').uploadify({
                 //让flash 充满这个头像小图标
                width: 120,
                height: 120,
                // 去掉小图标上的文字
                buttonText: '',
                itemTemplate: '<span></span>',
                swf: '/public/assets/uploadify/uploadify.swf',
                // 下一行 有问题
                uploader:'/api/uploader/avatar',
                fileObjName: 'tc_avatar',
                onUploadSuccess: function(a,b) {
                    console.log(b);
                    // 将后台返回的字符串格式的数据，转换成对象
                    var obj = JSON.parse(b);
                    console.log(obj);
                    // 选中图片，修改路径
                    $('.preview img').attr('src', obj.result.path);
                }

            });
            // 处理省市县三级联动
            $('#pcd').region({
                url: '/public/assets/jquery-region/region.json'
            });

            // 处理副文本
            CKEDITOR.replace('editor',{
                toolbarGroups: [
                    {name:'clipboard',groups:['clipboard','undo']},
                    {name:'editing',groups:['find','selection','spellchecker','editing']}
                ]
            });

        }

    });
});
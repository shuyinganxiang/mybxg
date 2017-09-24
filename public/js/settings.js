/**
 * Created by Administrator on 2017/9/23.
 */
define(['jquery','template','ckeditor','uploadify','region','datepicker','language','validate','form'], function($,template,CKEDITOR) {
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

            //// 处理副文本
            CKEDITOR.replace('editor',{
                toolbarGroups: [
                    {name:'clipboard',groups:['clipboard','undo']},
                    {name:'editing',groups:['find','selection','spellchecker','editing']}
                ]
            });
            // 处理表单提交
            $('#settingsForm').validate({
                sendForm: false,// 禁止默认提交
                valid: function () { // 通过之后调用的方法
                    // 拼接
                    var p = $('#p').find('option:selected').text();
                    var c = $('#c').find('option:selected').text();
                    var d = $('#d').find('option:selected').text();
                    var hometown = p+'/'+c+'/'+d;
                    console.log(hometown);

                    // 更新副文本内容  instance --- 实例
                    //for(var instance in CKEDITOR.instances){
                    // // 把所有的实例中的updateElement方法更新一下
                    // //把iform 中的内容更新到元素里面 --> 实现内容的更新
                    // CKEDITOR.instances[instance].updateElement();
                    // console.log(123);
                    // }
                    //console.log(CKEDITOR.instances);
                    //for(var instance in CKEDITOR.instances){
                    //    CKEDITOR.instances[instance].updateElement();
                    //    console.log(1);
                    //}

                    function checkForm(){

                        // 你的校验代码……

                        for ( var instance in CKEDITOR.instances )
                            CKEDITOR.instances[instance].updateElement();

                        return true;
                    }

                    // 提交表单
                    $(this).ajaxSubmit({
                        type:'post',
                        url:'/api/teacher/modify',
                        data: {tc_hometown: hometown},
                        dataType: 'json',
                        success: function (data) {
                            for ( var instance in CKEDITOR.instances )
                                CKEDITOR.instances[instance].updateElement();


                            // 控制页面刷新
                            if(data.code==200){

                                // 刷新当前页面
                                location.reload();
                                for(var instance in CKEDITOR.instances){
                                    CKEDITOR.instances[instance].updateElement();
                                    console.log(1);
                                }

                            }
                        }
                    });
                }
            });
        }

    });
});
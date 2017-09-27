/**
 * Created by Administrator on 2017/9/26.
 */
define(['jquery', 'template', 'util', 'uploadify', 'jcrop','form'], function ($, template, util) {
    // 设置导航菜单选中
    util.setMenu('/course/add');

    // 获取课程ID
    var csId = util.qs('cs_id');
    // 查询课程封面信息
    $.ajax({   // ajax 请求
        type: 'get', // 请求方式
        url: '/api/course/picture', // 要请求的url地址
        data: {cs_id: csId},
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            // 解析数据 渲染页面
            var html = template('pictureTpl', data.result);
            $('#pictureInfo').html(html);

            // 选中图片 (要裁的图片)
            var img = $('.preview img');
            // 为了使页面只有一个实例，定义nowCorp
            var nowCorp = null;

            // 处理封面上传操作  添加依赖 uploadify
            $('#myfile').uploadify({
                width: 80,
                height: 'auto',
                buttonText: '选择图片', // 按钮上的文字
                buttonClass: 'btn btn-success btn-sm',    // 按钮的样式
                itemTemplate: '<span></span>', // 去掉上传图片的字

                swf: '/public/assets/uploadify/uploadify.swf',
                uploader: '/api/uploader/cover',
                fileObjName: 'cs_cover_original',  // 指定上传名称
                formData: {cs_id: csId},   // 传递除图片以外的数据
                onUploadSuccess: function (a, b) { // 此处可以传递三个参数，我们需要的是第二个
                    // console.log(b);
                    var obj = JSON.parse(b); // 把字符串转成json格式
                    $('.preview img').attr('src', obj.result.path); // 将图片路径放进图片区域的属性中
                    // 当图片上传成功时，直接出现图片裁切框，按钮显示保存图片
                    cropImg();
                    $('#cropBtn').text('保存图片').attr('data-flag',true);
                }
            });


            // 图片裁切功能
            $('#cropBtn').click(function () {
                // 记录状态位  this --> a 标签
                var flag = $(this).attr('data-flag');
                if (flag) {
                    // 第二次点击 提交页面
                    // console.log(12322);
                    $('#cropForm').ajaxSubmit({
                        type: 'post',
                        url:'/api/course/update/picture',
                        data:{cs_id: csId},
                        dataType:'json',
                        success: function (data) {
                            // console.log(data);
                            if(data.code==200){
                                location.href = '/course/lesson?cs_id='+data.result.cs_id;
                            }
                        }
                    });
                } else {
                    // 第一次点击按钮  修改内容  给a标签添加 状态位自定义属性
                    $(this).text('保存图片').attr('data-flag', true);
                    // 实现图片裁切功能  可以在此实现，也可封装独立的方法
                    cropImg();
                }
            });

            // 封装一个独立的方法实现裁切
            function cropImg() {
                // 1、选中图片  (见上)
                img.Jcrop({
                    // 2、比例
                    aspectRatio: 2
                    // setSelect: [100,100,200,100]
                }, function () {
                    //console.log(11);
                    // 销毁当前的实例 -- 使用短路运算，第一次执行没有实例
                    nowCorp && nowCorp.destory(); // 保证裁切实例的唯一性
                    // nowCorp 就表示当前的实例对象  当cropImg 方法被调用的时候 nowCorp 里面就有值了
                    nowCorp = this;

                    // 清空裁切图中的图片
                    $('.thumb').html('');
                    // 显示缩略图 缩略图的宽和高
                    //this.initComponent('Thumbnailer', {width: 240, height: 120, mythumb: '.thumb'});
                    this.initComponent('Thumbnailer', {width: 240, height: 120, mythumb: '.thumb'});
                    $('.jcrop-thumb').css({
                        left: 0, top: 0
                    });

                    //console.log(this);
                    // 计算选取的数据（使 裁切框 默认在图片的正中间）
                    // 1、获取图片的宽高
                    var width = this.ui.stage.width;
                    var height = this.ui.stage.height;
                    // 2、计算选取的数据
                    var x = 0;
                    var y = (height - width / 2) / 2;
                    var w = width;
                    var h = width / 2;

                    // 3、创建一个选取
                    this.newSelection();
                    this.setSelect([x, y, w, h]);
                });
                // 监控选取的变化
                //img.parent().on('cropstart cropmove cropend',function(a,b,c) {
                img.parent().on('cropstart cropmove cropend', function (a, b, c) {
                    // console.log(c);  // 未打印出来，不报错
                    // 选取完成和变化的时候把对应的坐标数据填充到表单里 --> 下一步要提交表单，将表单提交给后台的的接口
                    var aInput = $('#cropForm').find('input');
                    aInput.eq(0).val(c.x);
                    aInput.eq(1).val(c.y);
                    aInput.eq(2).val(c.w);
                    aInput.eq(3).val(c.h);
                });
            }

            function cropImage() {
                img.Jcrop({
                    aspectRatio: 2
                }, function () {
                    //销毁当前实例，插件自带的方法
                    //第一进来的时候不执行f
                    //nowCrop && nowCrop.destroy();
                    //nowCrop = this;
                    //删除默认的图片
                    $('.thumb').html('');
                    //显示缩略图
                    this.initComponent('Thumbnailer', {width: 240, height: 120, mythumb: '.thumb'});
                    //console.log(this);
                    //设置生成的div的位置，要不位置不对
                    $('.jcrop-thumb').css({
                        left: 0,
                        top: 0
                    });
                    //获取图片的宽和高
                    var width = this.ui.stage.width;
                    var height = this.ui.stage.height;
                    //计算选区的数据
                    var x = 0;
                    var y = (height - width / 2) / 2;
                    var w = width;
                    var h = width / 2;
                    //创建一个选区
                    this.newSelection();
                    this.setSelect([x, y, w, h]);
                });
                //监控选区的变化
                img.parent().on('cropstart cropmove cropend', function (a, b, c) {
                    console.log(c);
                    //选区完成和变化的时候把对应的坐标和数据填充到表单里
                    //var aInput = $('#cropForm').find('input');
                    //aInput.eq(0).val(c.x);
                    //aInput.eq(1).val(c.y);
                    //aInput.eq(2).val(c.w);
                    //aInput.eq(3).val(c.h);
                });
            }


        }

    });
});

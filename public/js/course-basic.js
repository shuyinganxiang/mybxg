/**
 * Created by Administrator on 2017/9/25.
 */
define(['jquery','template','util','validate','form'], function ($,template,util) {
    // 设置导航栏选中
    util.setMenu('/course/add');

    // 获取课程id
    var csId = util.qs('cs_id');
    // console.log(csId);

    // 操作标志位
    var flag = util.qs('flag');


    // 根据课程的id查询详细信息
    $.ajax({
        type:'get',
        url:'/api/course/basic',
        data: {cs_id:csId},
        dataType: 'json',
        success: function (data) {
            // console.log(data);

            if(flag){
                data.result.operate = '编辑课程';
            }else{
                data.result.operate = '添加课程';
            }

            // 解析数据，渲染页面
            var html = template('basicTpl',data.result);
            $('#basicInfo').html(html);

            // 处理二级分类的下拉联动操作
            $('#firstType').change(function () {
                // console.log(123);
                // 获取一级分类的id
                var pid = $(this).val();
                // console.log(pid);
                // 根据一级分类的ID 查询所有的二级分类
                $.ajax({
                    type: 'get',
                    url: '/api/category/child',
                    data: {cg_id: pid},
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        var tpl = '<option value="">请选择二级分类...</option>'
                        +'    {{each list}}'
                        +'<option value="{{$value.cg_id}}">{{$value.cg_name}}</option>'
                        +'{{/each}}';

                        // list 是起的别名
                        var html = template.render(tpl,{list:data.result});
                        console.log(html);
                        $('#secondType').html(html);
                    }
                });
            });

            // 处理表单提交 添加 'validate','form'
            $('#basicForm').validate({
                sendForm:false,
                valid: function () {
                    console.log(456)
                    // 提交表单
                    $(this).ajaxSubmit({
                        type: 'post',
                        url: '/api/course/update/basic',
                        data: {cs_id: csId},
                        dataType: 'json',
                        success: function (data) {
                             console.log(data);
                            // 下一步跳转到封面裁切页面
                            location.href = '/course/picture?cs_id='+ data.result.cs_id;
                            // console.log(data.result.cs_id);
                        }
                    });
                }
            });


        }
    });


});
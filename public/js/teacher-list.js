/**
 * Created by Administrator on 2017/9/20.
 */
define(['jquery','template'],function ($,template) {
    // ���ú�̨�ӿڣ���ȡ���н�ʦ����
    $.ajax({
        type: 'get',
        url: '/api/teacher',
        dataType: 'json',
        success: function (data) {
            // console.log(data);
            // �������ݣ���Ⱦҳ��
            var html = template('teacherTpl',{list:data.result});
            $('#teacherInfo').html(html);
        }

    });
});
/**
 * Created by Administrator on 2017/9/20.
 */

// cookie û�з���ֵ������һ��jQuery�Ĳ��������������jQueryԭ���ϻ�$��
define(['jquery','cookie'], function ($) {
    // ʵ�ֵ�¼����
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
                    // �洢�û���½�����Ϣ
                    $.cookie('loginInfo',JSON.stringify(data.result),{path:'/'});
                    // ��¼�ɹ�����ת����ҳ��
                    location.href = '/main/index';
                }
            }
        });
        return false; // ��֯Ĭ����Ϊ����֯ð�ݣ�jQuery���� ԭ��js�У�ֻ��֯Ĭ����Ϊ
    });
});
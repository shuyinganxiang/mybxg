/**
 * Created by Administrator on 2017/9/20.
 */
require.config({
    baseUrl: '/public/assets',
    paths: {
        jquery: 'jquery/jquery.min',
        cookie: 'jquery-cookie/jquery.cookie',
        template: 'artTemplate/template-web',
        bootstrap: 'bootstrap/js/bootstrap',
        common: '../js/common',
        login: '../js/login',
        teacherlist: '../js/teacher-list'
    },
    shim: {
        // bootstrap ���Ǳ�׼ģ�飬Ҫ��shim
        // �� bootstrap ���� jQuery ������
        bootstrap: {
                // deps: require.js �е�һ�����ԣ������ѷǱ�׼��ģ�飬��ɱ�׼��ģ��  ��ķ�ʽ���������һ����jQuery������
            deps: ['jquery']

        }

    }
});
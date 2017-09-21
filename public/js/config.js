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
        // bootstrap 不是标准模块，要加shim
        // 给 bootstrap 加上 jQuery 的依赖
        bootstrap: {
                // deps: require.js 中的一个属性，用来把非标准的模块，变成标准的模块  变的方式，就是添加一个（jQuery）依赖
            deps: ['jquery']

        }

    }
});
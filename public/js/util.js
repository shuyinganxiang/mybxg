/**
 * Created by Administrator on 2017/9/21.
 */
// 工具方法
// 封装、重构获取url中id值的方法
define(['jquery'], function ($) {
    return {
        // 查询字符串queryString
        qs: function (key) {
            var param = location.search.substr(1);
            var tcId = null;
            if(param) {
                var params = param.split('&');
                $.each(params, function (i, item) {
                    // console.log(item);
                    var kv = item.split('=');
                    if (kv[0] == key) {
                        tcId = kv[1];
                        return false; // 终止each循环，js中的forEach循环不可以终止，只能遍历到最后
                    }
                });
                //console.log(tcId);
            }
            return tcId;
        },
        setMenu: function (path) {
            // 左侧边栏选中高亮效果
            $('.aside .navs a[href="'+path+'"]').addClass('active');
        }
    }
});

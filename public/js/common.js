define(['jquery','template','cookie'], function ($,template) {
	// NProgress.start();

	// NProgress.done();

	// 控制左侧菜单的折叠和展开
	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});

	// 实现退出功能 --- 没有效果是缓存的问题，network/comment.js/清除浏览器cache
	$('#logoutBtn').click(function () {
		//alert(1);
		// 调接口  发请求
		$.ajax({
			type: 'post',
			url: '/api/logout',
			dataType: 'json',
			success: function (data) {
				//console.log(data);
				// 退出成功，重新跳转到登录页
				if(data.code == 200){
					location.href = '/main/login';
				}
			}
		});
	});

	// 验证是否登录了 ---- 需要在index.html中引入jQuery。cookie文件
	// console.log($.cookie);
	var flag = $.cookie('PHPSESSID');
	//console.log(flag);
	if(!flag && location.pathname != '/main/login'){
		location.href = '/main/login';
	}

	// loginInfo 和保存的cookie信息的名一样
	// 填充头像信息
	var loginInfo = $.cookie('loginInfo');
	console.log(loginInfo);
	// loginInfo 的优化
	loginInfo = loginInfo && JSON.parse(loginInfo);
	// 头像信息  --- 可以使用模板引擎来做
	var tpl = '<div class="avatar img-circle"><img src="{{tc_avatar}}"></div><h4>{{tc_name}}</h4>';
	var html = template.render(tpl,loginInfo);
	$('.aside .profile').html(html);

	//$('.aside .profile img').attr('src',loginInfo.tc_avatar);
	// 用户名称
	//$('.aside .profile h4').html(loginInfo.tc_name);
});
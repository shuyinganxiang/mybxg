
	NProgress.start();

	NProgress.done();

	$('.navs ul').prev('a').on('click', function () {
		$(this).next().slideToggle();
	});

	// ʵ���˳����� --- û��Ч���ǻ�������⣬network/comment.js/��������cache
	$('#logoutBtn').click(function () {
		//alert(1);
		// ���ӿ�  ������
		$.ajax({
			type: 'post',
			url: '/api/logout',
			dataType: 'json',
			success: function (data) {
				//console.log(data);
				// �˳��ɹ���������ת����¼ҳ
				if(data.code == 200){
					location.href = '/main/login';
				}
			}
		});
	});

	// ��֤�Ƿ��¼�� ---- ��Ҫ��index.html������jQuery��cookie�ļ�
	// console.log($.cookie);
	var flag = $.cookie('PHPSESSID');
	//console.log(flag);
	if(!flag){
		location.href = '/main/login';
	}

	// loginInfo �ͱ����cookie��Ϣ����һ��
	// ���ͷ����Ϣ
	var loginInfo = $.cookie('loginInfo');
	console.log(loginInfo);
	// loginInfo ���Ż�
	loginInfo = loginInfo && JSON.parse(loginInfo);
	// ͷ����Ϣ
	$('.aside .profile img').attr('src',loginInfo.tc_avatar);
	// �û�����
	$('.aside .profile h4').html(loginInfo.tc_name);
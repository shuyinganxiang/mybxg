<?php
	// 本PHP：根据url返回相应的页面 --- 相当于 路由： 负责导航和分发

	// utf-8 设置header
	header('content-type:text/html;charset=utf-8');
	// 编码格式 文件 --> 设置编码格式 --> GBK  浏览器的默认编码格式是根据操作系统来设定的

	//include('./header.html');
	//echo '<div>主页内容</div>';
	//include('./footer.html');

	// include 在当前的页面中嵌入子页面
	/*
		根据url中的信息。判断要访问的页面
	*/
	// 1、include('./views/main/index.html');

	/*
		2、$path = $_SERVER['PATH_INFO'];
			include('./views'.$path.'.html');
	*/

	// 3、路由完善

	// 默认路径名称
	$dir = 'main';
	// 默认文件名称
	$filename = 'index';

	// 判断路径是否存在
	if(array_key_exists('PATH_INFO',$_SERVER)){
		// 路径存在 --- 获取PATH_INFO
		// 请求路径
		$path = $_SERVER['PATH_INFO'];

		// 截取字符串 js中的substr方法是通过对象来调用的
		$str = substr($path,1);
		// 分隔字符串
		$ret = explode('/',$str);
		if(count($ret) == 2){
			// 两层路径
			// 覆盖默认路径
			$dir = $ret[0];
			// 覆盖默认路径
			$filename = $ret[1];
		}else{
			// 其他情况统一跳转到登录页
			$filename = 'login';
		}
	}
	// 嵌入子页面
	include('./views/'.$dir.'/'.$filename.'.html');


	// 进一步完善
	// 引入.htaccess文件到index.php根目录下
	// 开方权限
	// 实现在url中不写index.php也能访问到页面
?>
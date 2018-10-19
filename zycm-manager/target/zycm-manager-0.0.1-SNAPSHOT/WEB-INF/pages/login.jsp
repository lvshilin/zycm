<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>周瑜传媒后台管理</title>
<link rel="stylesheet" href="./bootstrap/css/bootstrap.min.css" />
<link rel="stylesheet" href="./bootstrap/css/bootstrap-theme.min.css" />
<link rel="stylesheet" href="./static/css/alert.css" />
</head>
<body>
	<img style="position: absolute;" id="backgroup"
		src="./static/pic/login.png" width="100%">
	<div align="center" style="width: 30%; background-color: white; position: absolute; margin-left: 35%; margin-top: 10%">
		<div class="form-group" style="margin-top: 40px;">
			<input style="width: 50%" type="text" class="form-control" id="userId" placeholder="请输入账号">
		</div>
		<div class="form-group">
			<input style="width: 50%" type="password" class="form-control" id="password" placeholder="请输入密码">
		</div>
		<button id="login" type="button" class="btn btn-success">点击登陆</button>&nbsp;&nbsp;
		<button id="error" type="button" class="btn btn-danger">忘记密码</button>
		<div style="margin-top: 30px;"></div>
	</div>
	<div id="message" style="z-index:9999;left: 5%;width: 90%;position: fixed;background:none;top:50%;display: none"> 
		<p class="msg" style="background: none repeat scroll 0 0 #000; border-radius: 30px;color: #fff; margin: 0 auto;padding: 1.5em;text-align: center;width: 30%;opacity: 0.8;"></p>
	</div>
</body>
<script src="./jquery-2.1.4/jquery.min.js"></script>
<script src="./bootstrap/js/bootstrap.min.js"></script>
<script src="./static/js/api.js"></script>
<script src="./static/js/alert.js"></script>
<script type="text/javascript">
	var h = document.documentElement.clientHeight;//可见区域高度
	$("#backgroup").css("height", h);
	$("#login").click(function(){
		var userId = $("#userId").val();
		var password = $("#password").val();
		var p = {
				"userId":userId,
				"password":password
				};
		util.ajaxApi("./adminLogin.do",p,"POST",function(data){
			if(data.code == 200){
				location.href = "./xueyuanguanli.do";
			}else{
				swal(data.message);
			}
		});
		
	});
</script>
</html>
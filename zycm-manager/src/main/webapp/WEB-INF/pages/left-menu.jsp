<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>后台管理</title>
<link rel="stylesheet" href="./bootstrap/css/bootstrap.min.css" />
<link rel="stylesheet" href="./bootstrap/css/bootstrap-theme.min.css" />
</head>
<body>
<div id="leftMenu" align="center" style="width: 15%;background-color: black;float: left;">
	<div class="well"><p style="font-size: 20px;">操作菜单</p></div>
	<ul class="nav nav-pills nav-stacked" style="width: 90%">
  		 <li><a href="./xueyuanguanli.do">学员管理</a></li>
  		 <li><a href="./baomingguanli.do">报名管理</a></li>
  		 <li><a href="./dianpuguanli.do">店铺管理</a></li>
	</ul>
</div>
</body>
<script src="./jquery-2.1.4/jquery.min.js"></script>
<script src="./bootstrap/js/bootstrap.min.js"></script>
<script src="./static/js/api.js"></script>
<script type="text/javascript">
var h = document.documentElement.clientHeight;//可见区域高度
$("#leftMenu").css("height", h);
</script>
</html>
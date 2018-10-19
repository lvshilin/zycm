<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>后台管理</title>
<link rel="stylesheet" href="./bootstrap/css/bootstrap.min.css" />
<link rel="stylesheet" href="./bootstrap/css/bootstrap-theme.min.css" />
<link rel="stylesheet" href="./static/css/bootstrap-table.css" />
<link rel="stylesheet" href="./static/css/alert.css" />
</head>
<body>
<%@ include file="left-menu.jsp" %>
<div style="float: left;width: 85%;" >
	<ol class="breadcrumb">
	  <li>后台管理系统</li>
	  <li class="active">报名管理页面</li>
	</ol>
    <div class="input-group" style="width: 20%;">
      <input type="text" class="form-control" placeholder="请输入要搜索的名字">
	      <span class="input-group-btn">
	        <button class="btn btn-default" type="button">Go!</button>
	      </span>
    </div>
	<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
  		<span class="glyphicon glyphicon-plus"></span> 录入学生
	</button>
	<table id="table"></table>
</div>

<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Modal title</h4>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
</body>
<script src="./jquery-2.1.4/jquery.min.js"></script>
<script src="./bootstrap/js/bootstrap.min.js"></script>
<script src="./static/js/api.js"></script>
<script src="./static/js/alert.js"></script>
<script src="./static/js/bootstrap-table.js"></script>
<script src="./bootstrap/locale/bootstrap-table-zh-CN.js"></script>
<script type="text/javascript">
var h = document.documentElement.clientHeight;//可见区域高度
$("#leftMenu").css("height", h);

$("#table").bootstrapTable({ // 对应table标签的id
    url: "./queryStudentList.do", // 获取表格数据的url
    cache: false, // 设置为 false 禁用 AJAX 数据缓存， 默认为true
    striped: true,  //表格显示条纹，默认为false
    pagination: true, // 在表格底部显示分页组件，默认false
    pageList: [5, 10], // 设置页面可以显示的数据条数
    pageSize: 10, // 页面数据条数
    pageNumber: 1, // 首页页码
    sidePagination: 'server', // 设置为服务器端分页
    queryParams: function (params) { // 请求服务器数据时发送的参数，可以在这里添加额外的查询参数，返回false则终止请求
        return {
            pageSize: params.limit, // 每页要显示的数据条数
            offset: params.offset, // 每页显示数据的开始行号
            sort: params.sort, // 要排序的字段
            sortOrder: params.order, // 排序规则
            dataId: $("#dataId").val() // 额外添加的参数
        }
    },
    sortName: 'age', // 要排序的字段
    sortOrder: 'desc', // 排序规则
    columns: [
         {
            field: 'clazz', 
            title: '期次', 
            align: 'center', 
            valign: 'middle' 
        },{
            field: 'name', // 返回json数据中的name
            title: '名字', // 表格表头显示文字
            align: 'center', // 左右居中
            valign: 'middle' // 上下居中
        }, {
            field: 'age',
            title: '年龄',
            align: 'center',
            valign: 'middle'
        }, {
            field: 'level',
            title: '学历',
            align: 'center',
            valign: 'middle'
        },{
            field: 'isPay',
            title: '是否缴费',
            align: 'center',
            valign: 'middle',
            formatter: function (value, row, index){ // 单元格格式化函数
                var text = '-';
                if (value == 1) {
                    text = "已缴费";
                } else if (value == 2) {
                    text = "预付款";
                } else if (value == 3) {
                    text = "已预定";
                } else if (value == 4) {
                    text = "未付款";
                }
                return text;
            }
        }, {
            title: "操作",
            align: 'center',
            valign: 'middle',
            width: 160, // 定义列的宽度，单位为像素px
            formatter: function (value, row, index) {
                return '<button class="btn btn-primary btn-sm" onclick="del(\'' + row.id + '\')">删除</button>';
            }
        }
    ],
    onLoadSuccess: function(){  //加载成功时执行
          console.info("加载成功");
    },
    onLoadError: function(){  //加载失败时执行
          console.info("加载数据失败");
    }

})

$("#addStudent").click(function(){
	
})
</script>
</html>
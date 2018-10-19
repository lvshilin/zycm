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
	  <li class="active">店铺管理页面</li>
	</ol>
    <div class="input-group" style="width: 20%;margin-left: 30px;">
      <input type="text" class="form-control" placeholder="请输入要搜索的店铺">
	      <span class="input-group-btn">
	        <button class="btn btn-default" type="button">Go!</button>
	      </span>
    </div>
	<button style="float: right;margin:20px;" type="button" class="btn btn-info btn-lg" data-toggle="modal" id="modalBtn" >
  		<span class="glyphicon glyphicon-plus"></span> 录入店铺
	</button>
	<table id="table"></table>
</div>

<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">店铺录入</h4>
      </div>
      <div class="modal-body">
        <div class="input-group" style="width: 80%;margin-left: 30px;">
 			 <span class="input-group-addon"><span class="glyphicon glyphicon-scale"></span></span>
 			 <input type="text" placeholder="请输入店铺名称（必填）" id="storeName" class="form-control">
		</div>
		<div style="margin-top: 10px;"></div>
		<div class="input-group" style="width: 80%;margin-left: 30px;">
 			 <span class="input-group-addon"><span class="glyphicon glyphicon-plane"></span></span>
 			 <input type="text" id="storeAddress" placeholder="请输入店铺地址（必填）" class="form-control">
		</div>
		<div style="margin-top: 10px;"></div>
		<div class="input-group" style="width: 80%;margin-left: 30px;">
 			 <span class="input-group-addon"><span class="glyphicon glyphicon-pencil"></span></span>
 			 <input type="text" id="storeDetail" placeholder="请输入店铺简介（必填）" class="form-control">
		</div>
		<div style="margin-top: 10px;"></div>
		<div class="input-group" style="width: 80%;margin-left: 30px;">
 			 <span class="input-group-addon"><span class="glyphicon glyphicon-phone"></span></span>
 			 <input type="text" id="storeNum" placeholder="请输入商家手机号" class="form-control">
		</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        <button type="button" id="addStore" class="btn btn-primary">保存</button>
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

var opt = { // 对应table标签的id
		url: "./store/queryStoreList.do", // 获取表格数据的url
	    cache: false, // 设置为 false 禁用 AJAX 数据缓存， 默认为true
	    striped: true,  //表格显示条纹，默认为false
	    pagination: true, // 在表格底部显示分页组件，默认false
	    pageList: [5, 10], // 设置页面可以显示的数据条数
	    pageSize: 10, // 页面数据条数
	    pageNumber: 1, // 首页页码
	    sidePagination: 'server', // 设置为服务器端分页
	    queryParams: function (params) { // 请求服务器数据时发送的参数，可以在这里添加额外的查询参数，返回false则终止请求
	        return {
	        	rows: params.limit, // 每页要显示的数据条数
	            page: params.offset, // 每页显示数据的开始行号
	            sort: params.sort, // 要排序的字段
	            sortOrder: params.order, // 排序规则
	        }
	    },
	    sortName: 'age', // 要排序的字段
	    sortOrder: 'desc', // 排序规则
	    columns: [
	         {
	            field: 'storeName', 
	            title: '店铺名称', 
	            align: 'center', 
	            valign: 'middle' 
	        },{
	            field: 'storeAddress', // 返回json数据中的name
	            title: '店铺地址', // 表格表头显示文字
	            align: 'center', // 左右居中
	            valign: 'middle' // 上下居中
	        }, {
	            field: 'storeDetail',
	            title: '店铺简介',
	            align: 'center',
	            valign: 'middle'
	        }, {
	            field: 'storeNum',
	            title: '商家手机',
	            align: 'center',
	            valign: 'middle'
	        }, {
	            title: "操作",
	            align: 'center',
	            valign: 'middle',
	            width: 160, // 定义列的宽度，单位为像素px
	            formatter: function (value, row, index) {
	                return '<button class="btn btn-primary btn-sm" onclick="delStore(\'' + row.id + '\')">删除</button>';
	            }
	        }
	    ],
	    onLoadSuccess: function(){  //加载成功时执行
	          console.info("加载成功");
	    },
	    onLoadError: function(){  //加载失败时执行
	          console.info("加载数据失败");
	    }

	}

$("#table").bootstrapTable(opt);
$("#modalBtn").click(function(){
	$('#myModal').modal('show');
	$("#storeName").val("");
	$("#storeAddress").val("");
	$("#storeDetail").val("");
	$("#storeNum").val("");
})
$("#addStore").click(function(){
	var storeName = $("#storeName").val();
	var storeAddress = $("#storeAddress").val();
	var storeDetail = $("#storeDetail").val();
	var storeNum = $("#storeNum").val();
	var p = {
		 "storeName":storeName,
		 "storeAddress":storeAddress,
		 "storeDetail":storeDetail,
		 "storeNum":storeNum
	}
	util.ajaxApi("./store/addStore.do",p,"POST",function(data){
		if(data.code == 200){
			$('#myModal').modal('hide');
			swal('操作成功', data.message, 'success');
			$("#table").bootstrapTable('refresh',opt);
		}else{
			swal(data.message);
		}
	});
})
function delStore(id){
	
	swal({title: '警告',text: '请确认您的操作？',type: 'warning',
		  showCancelButton: true,
		  confirmButtonText: 'Yes, delete it!',
		  cancelButtonText: 'No, keep it',
		}).then(function(isConfirm){
		  if(isConfirm === true){
				  var p = {
							 "id":id
						  }
				util.ajaxApi("./store/delStore.do",p,"POST",function(data){
					if(data.code == 200){
						swal('操作成功', data.message, 'success');
						$("#table").bootstrapTable('refresh',opt);
					}else{
						swal(data.message);
					}
				});
		  	 }
		 })
}
</script>
</html>
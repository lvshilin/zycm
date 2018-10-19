var util = {
	//ajax请求封装***************************************************************************************************************************************************
	ajaxApi : function(url, param, method, call) {
		if (param != null) {
			$.ajax({
				url : url,
				dataType : "JSON",
				contentType : 'application/json',
				data : JSON.stringify(param),
				type : method,
				success : call
			})
		}else{
			$.ajax({
				url : url,
				dataType : "JSON",
				contentType : 'application/json',
				type : method,
				success :call
			})
		}
	},
	//截取url字符串封装***************************************************************************************************************************************************
	getUrlParam : function(field) {
		var reg = new RegExp("(^|&)" + field + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			return unescape(r[2]);
		return null;
	},
	/*
	 * 移动端渐隐式弹框***************************************************************************************************************************************************
	 * <div id="message" style="z-index:9999;left: 5%;width: 90%;position: fixed;background:none;top:50%;display: none"> 
	 *	 <p class="msg" style="background: none repeat scroll 0 0 #000; border-radius: 30px;color: #fff; margin: 0 auto;padding: 1.5em;text-align: center;width: 70%;opacity: 0.8;"></p>
	 * </div>
	 */
	alertMessage:function(content) {
		$("#message").show();
		$(".msg").html(content);
		setTimeout('$("#message").fadeOut()', 1500);
	} 
}
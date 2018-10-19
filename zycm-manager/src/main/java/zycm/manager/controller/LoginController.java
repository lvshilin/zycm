package zycm.manager.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import zycm.manager.commons.ReturnVO;
import zycm.manager.entity.AdminEntity;

@Controller
public class LoginController {
	
	@RequestMapping(value="adminLogin.do")
	@ResponseBody
	public ReturnVO<AdminEntity> login(@RequestBody AdminEntity admin){
		ReturnVO<AdminEntity> vo = new ReturnVO<AdminEntity>();
		if(admin.getUserId().equals("admin")&&admin.getPassword().equals("zycm")){
			vo.setCode(200);
			vo.setMessage("登陆成功");
			vo.setData(admin);
			return vo;
		}else{
			vo.setCode(404);
			vo.setMessage("管理员登陆失败");
			vo.setData(admin);
			return vo;
		}
	}
	
}

package zycm.manager.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController {
	
	@RequestMapping("/login.do")
	public String login(){
		return "login";
	}
	
	@RequestMapping("/xueyuanguanli.do")
	public String home(){
		return "xueyuanguanli";
	}
	
	@RequestMapping("/baomingguanli.do")
	public String baomingguanli(){
		return "baomingguanli";
	}
	
	@RequestMapping("/dianpuguanli.do")
	public String shangpinguanli(){
		return "dianpuguanli";
	}
	
}

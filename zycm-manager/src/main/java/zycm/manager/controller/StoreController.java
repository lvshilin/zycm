package zycm.manager.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import zycm.manager.commons.ReturnVO;
import zycm.manager.entity.PageEntity;
import zycm.manager.entity.StoreEntity;
import zycm.manager.service.StoreService;

@Controller
@RequestMapping("store")
public class StoreController {
	
	@Autowired
	private StoreService storeService;
	
	@RequestMapping("queryStoreList.do")
	@ResponseBody
	public Map<String,Object> queryStoreList(@RequestParam Integer page,@RequestParam Integer rows){
		ReturnVO returnVo = new ReturnVO<>();
		Map<String,Object> map = new HashMap<>();
		PageEntity pageEntity = new PageEntity();
		pageEntity.setPage(page);
		pageEntity.setRows(rows);
		List<StoreEntity> list = storeService.queryStoreList(pageEntity);
		map.put("rows", list);
		map.put("total", storeService.queryStoreNum());
		return map;
	}
	
	@RequestMapping("addStore.do")
	@ResponseBody
	public ReturnVO addStore(@RequestBody StoreEntity stroeEntity ,HttpServletRequest request, HttpServletResponse response){
		ReturnVO returnVo = new ReturnVO<>();
		int addStore = storeService.addStore(stroeEntity);
		if(addStore==1){
			returnVo.setCode(200);
			returnVo.setMessage("addStore success");
		}else{
			returnVo.setCode(0000);
			returnVo.setMessage("addStore error");
		}
		return returnVo;
	}
	
	@RequestMapping("delStore.do")
	@ResponseBody
	public ReturnVO delStore(@RequestBody StoreEntity stroeEntity ,HttpServletRequest request, HttpServletResponse response){
		ReturnVO returnVo = new ReturnVO<>();
		int delStore = storeService.delStore(stroeEntity);
		if(delStore==1){
			returnVo.setCode(200);
			returnVo.setMessage("delStore success");
		}else{
			returnVo.setCode(0000);
			returnVo.setMessage("delStore error");
		}
		return returnVo;
	}
	
}

package zycm.manager.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import zycm.manager.commons.CommonsUtils;
import zycm.manager.commons.ReturnVO;
import zycm.manager.entity.PageEntity;
import zycm.manager.entity.StudentEntity;
import zycm.manager.service.StudentService;

@Controller
public class StudentController {
	
	@Autowired
	private StudentService studentService;
	
	@RequestMapping("queryStudentList.do")
	@ResponseBody
	public Map<String,Object> queryStudentList(@RequestParam Integer page,@RequestParam Integer rows){
		Map<String,Object> map = new HashMap<>();
		PageEntity pageEntity = new PageEntity();
		pageEntity.setPage(page);
		pageEntity.setRows(rows);
		List<StudentEntity> list = studentService.queryStudentList(pageEntity);
		map.put("rows", list);
		map.put("total", studentService.queryStudentNum());
		return map;
	}
	
	@RequestMapping("addStudent.do")
	@ResponseBody
	public ReturnVO<StudentEntity> addStudent(@RequestBody StudentEntity s){
		ReturnVO<StudentEntity> vo = new ReturnVO<>();
		if(StringUtils.isEmpty(s.getId())){
			s.setId(CommonsUtils.getUUID());
		}
		int addStudent = studentService.addStudent(s);
		if(addStudent==1){
			vo.setCode(200);
			vo.setMessage("录入学生成功");
			vo.setData(s);
			return vo;
		}else{
			vo.setCode(400);
			vo.setMessage("录入学生异常");
			vo.setData(s);
			return vo;
		}
	}
	
	@RequestMapping("addSignUp.do")
	@ResponseBody
	public ReturnVO<StudentEntity> addSignUp(@RequestBody StudentEntity s){
		ReturnVO<StudentEntity> vo = new ReturnVO<>();
		if(StringUtils.isEmpty(s.getId())){
			s.setId(CommonsUtils.getUUID());
		}
		int addSignUp = studentService.addSignUp(s);
		if(addSignUp==1){
			vo.setCode(200);
			vo.setMessage("报名成功");
			vo.setData(s);
			return vo;
		}else{
			vo.setCode(400);
			vo.setMessage("报名异常");
			vo.setData(s);
			return vo;
		}
	}

}

package zycm.manager.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import zycm.manager.entity.PageEntity;
import zycm.manager.entity.StudentEntity;
import zycm.manager.mapper.StudentMapper;
import zycm.manager.service.StudentService;

@Service
public class StudentServiceImpl implements StudentService {
	
	@Autowired
	private StudentMapper studentMapper;
	
	@Override
	public int addStudent(StudentEntity s) {
		return studentMapper.addStudent(s);
	}

	@Override
	public List<StudentEntity> queryStudentList(PageEntity pageEntity) {
		return studentMapper.queryStudentList(pageEntity);
	}

	@Override
	public int queryStudentNum() {
		return studentMapper.queryStudentNum();
	}

	@Override
	public int addSignUp(StudentEntity s) {
		return studentMapper.addSignUp(s);
	}

}

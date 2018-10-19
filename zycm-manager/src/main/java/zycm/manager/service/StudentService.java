package zycm.manager.service;

import java.util.List;

import zycm.manager.entity.PageEntity;
import zycm.manager.entity.StudentEntity;

public interface StudentService {

	int addStudent(StudentEntity s);

	List<StudentEntity> queryStudentList(PageEntity pageEntity);

	int queryStudentNum();

	int addSignUp(StudentEntity s);

}

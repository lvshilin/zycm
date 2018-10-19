package zycm.manager.mapper;

import java.util.List;

import zycm.manager.entity.PageEntity;
import zycm.manager.entity.StudentEntity;

public interface StudentMapper {

	int addStudent(StudentEntity s);

	List<StudentEntity> queryStudentList(PageEntity pageEntity);

	int queryStudentNum();

	int addSignUp(StudentEntity s);

}

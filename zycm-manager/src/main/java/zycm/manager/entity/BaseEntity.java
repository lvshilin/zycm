package zycm.manager.entity;

import java.util.Date;

public class BaseEntity {
	
	private String delMart;
	private String updateUser;
	private String createUser;
	private Date updateTime;
	private Date createTime;
	
	public String getDelMart() {
		return delMart;
	}
	public void setDelMart(String delMart) {
		this.delMart = delMart;
	}
	public String getUpdateUser() {
		return updateUser;
	}
	public void setUpdateUser(String updateUser) {
		this.updateUser = updateUser;
	}
	public String getCreateUser() {
		return createUser;
	}
	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
}

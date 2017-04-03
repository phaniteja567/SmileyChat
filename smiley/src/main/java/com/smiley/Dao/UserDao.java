package com.smiley.Dao;



import java.util.List;

import com.smiley.model.Users;


public interface UserDao {
	
	void registerUser(Users user);
	//public Users get(String id);
	//public List<Users> list(); 
	List<Users> getUsers();
	int validateUser(String username,String password);
	void updateUser(Users user);
	Users viewUserById(int id);
	void logout(String username);
	public List<Users> findFriends(String username);
}

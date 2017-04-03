package com.smiley.Dao;

import java.util.List;

import com.smiley.model.AddFriend;

public interface FindFriendDao {
	
	void addFriend(AddFriend friend);
	void updateFriend(AddFriend friend);
	void deleteFriend(AddFriend friend);
	List<AddFriend> viewFriends(String username);

}

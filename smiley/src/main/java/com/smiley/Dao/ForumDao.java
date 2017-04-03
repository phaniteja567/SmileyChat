package com.smiley.Dao;

import java.util.List;

import com.smiley.model.Forum;

public interface ForumDao {

	void createForum(Forum forum);
	List<Forum> viewForum();
	void updateForum(Forum forum);
	void deleteForum(int forum_Id);

}

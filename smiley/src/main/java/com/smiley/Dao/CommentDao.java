package com.smiley.Dao;

import java.util.List;

import com.smiley.model.Comment;

//import com.smiley.model.Friend;

public interface CommentDao {
	void addComment(Comment comment);
	void updateComment(Comment comment);
	void removeComment(Comment comment);

	List<Comment> viewComments(int blog_Id);
	List<Comment> viewComment(int question_Id);

	
}

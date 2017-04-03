package com.smiley.Dao;

import java.util.List;

import com.smiley.model.Blog;

public interface BlogDao {

		void createBlog(Blog blog);
		List<Blog> viewBlogs();
		List<Blog> viewBlogs(boolean status);
		void updateBlog(Blog blog);
		void deleteBlog(int blog_Id);
		
		List<Blog> viewMyBlogs(String postedby);
}

package com.smiley.Dao;

import java.util.List;

import com.smiley.model.Applications;

public interface ApplicationsDao {
	void addApplications(Applications applications);
	List<Applications> viewApplications();
	void updateApplications(Applications applications);
	void deleteApplications(int id);

}

package com.smiley.Dao;

import java.util.List;

import com.smiley.model.Career;
import com.smiley.model.jobRegistration;

public interface CareerDao {

	void createJob(Career career);
	List<Career> viewCareers();
	void updateCareers(Career career);
	
	void deleteJobs(int job_Id);
	void registerJob(jobRegistration jobReg);

}

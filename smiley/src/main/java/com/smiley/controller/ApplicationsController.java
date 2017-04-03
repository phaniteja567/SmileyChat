package com.smiley.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.smiley.Dao.ApplicationsDao;
import com.smiley.model.Applications;



@RestController
public class ApplicationsController {
	
	
		@Autowired
		ApplicationsDao applicationsDao;
		@RequestMapping(value="/addApplications",headers="Accept=application/json",method=RequestMethod.POST)
		public void addApplications(@RequestBody Applications applications)
		{
			applicationsDao.addApplications(applications);
		}
		@RequestMapping(value="/viewApplications",headers="Accept=application/json",method=RequestMethod.GET)
		public List<Applications> viewApplications()
		{
			return applicationsDao.viewApplications();
		}
		@RequestMapping(value="/updateApplications",headers="Accept=application/json",method=RequestMethod.PUT)
		public void updateApplications(@RequestBody Applications applications)
		{
			System.out.println("Inside update application");
			applicationsDao.updateApplications(applications);
		}
		@RequestMapping(value="/deleteApplications/{id}",headers="Accept=application/json",method=RequestMethod.DELETE)
		public void deleteJob(@PathVariable int id)
		{
			System.out.println("The ID in controller:"+id);
			applicationsDao.deleteApplications(id);
		}

	}



package com.smiley.Dao;

import java.util.Date;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.smiley.model.Applications;

@Transactional
@Repository
public class ApplicationsDaoImpl implements ApplicationsDao {
	@Autowired
	SessionFactory sessionFactory;

	public void addApplications(Applications applications) {
		Session session=sessionFactory.getCurrentSession();
		  Date date=new Date();
		 String data=date.toString();
		applications.setDate(data);
		session.save(applications);
		
	}

	public List<Applications> viewApplications() {
Session session=sessionFactory.getCurrentSession();
		
		List<Applications> list=session.createCriteria(Applications.class).list();
		
		return list;
	}

	public void updateApplications(Applications applications) {
		Session session=sessionFactory.getCurrentSession();
		  Date date=new Date();
			 String data=date.toString();
			 applications.setDate(data);
		session.update(applications);
		
	}

	public void deleteApplications(int id) {
		Session session=sessionFactory.getCurrentSession();
		Applications applications=(Applications)session.get(Applications.class,new Integer(id));
		session.delete(applications);
		
	}

}

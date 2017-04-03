package com.smiley.Dao;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.smiley.model.Blog;
import com.smiley.model.Career;
import com.smiley.model.jobRegistration;


@Transactional
@Repository
public class CareerDaoImpl implements CareerDao {

	@Autowired
	SessionFactory sessionfactory;
	public void createJob(Career career) {
		sessionfactory.getCurrentSession().save(career);
	}
	
	public List<Career> viewCareers() {
        Session session=sessionfactory.getCurrentSession();
        String hql="from Career";
		Query query=session.createQuery(hql);
		return query.list();
	}

	public void updateCareers(Career career) {
		sessionfactory.getCurrentSession().update(career);
	}

	/*public void deleteCareers(Career career) {
		sessionfactory.getCurrentSession().delete(career);
		
	}*/

	public void registerJob(jobRegistration jobReg) {
		sessionfactory.getCurrentSession().save(jobReg);
		
	}

	public void deleteJobs(int job_Id) {
		Session session=sessionfactory.getCurrentSession();
		Career career=(Career) session.get(Career.class, new Integer(job_Id));
		 session.delete(career);		
	}
	

}

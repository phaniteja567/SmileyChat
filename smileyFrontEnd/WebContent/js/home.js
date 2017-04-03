
var smileychat=angular.module("smiley",['ngRoute','ngCookies']);
smileychat.config(function($routeProvider)
{
	$routeProvider.when("/",
			{
		templateUrl:"partials/home.html",
		controller:"homeController"
		
	        })
	 .when("/home",
	    			{
	    		templateUrl:"partials/home.html",
	    		controller:"homeController"
	    		
	    	        })
	.when("/register",
			{
		templateUrl:"partials/register.html",
		controller:"registerController"
	
			})
			.when("/applications",
			{
		templateUrl:"partials/applications.html",
		controller:"applicationsController"
	
			})
			
	.when("/blog",
			{
		templateUrl:"partials/blog.html",
		controller:"blogController"
		
	        })
	 .when("/blogAdmin",
			{
		templateUrl:"partials/blogAdmin.html",
		controller:"adminBlogController"
		
	        })
	 .when("/allblogs",
			{
		templateUrl:"partials/allblogs.html",
		controller:"allblogsController"
		
			}) .when("/about",
					{
				templateUrl:"partials/about.html",
				controller:"aboutController"
				
					})
	 .when("/admin",
			{
		templateUrl:'partials/admin.html',
		controller:'adminController'					
			})
	.when("/userHome",
			{
		templateUrl:'partials/userHome.html',
		controller:'userHomeController'					
			})
			.when("/userforum",
			{
		templateUrl:"partials/userforum.html",
		controller:"userforumController"
		
			})
	.when("/career",
			{
		templateUrl:"partials/career.html",
		controller:"careerController"
			})
	.when("/chat",
			{
		templateUrl:"partials/chat.html",
	controller:'chatController'
			})
	.when("/careeruser",
			{
		templateUrl:"partials/careeruser.html",
		controller:"careeruserController"
			})

	.when("/forum",
			{
		templateUrl:"partials/forum.html",
	    controller:"forumController"
		    })

	.when("/login",
			{
		templateUrl:"partials/login.html",
		controller:"loginController"
			})
	.when("/logout",
			{
		templateUrl:"partials/logout.html",
		controller:"logoutController"
			});
});



smileychat.controller('registerController',['$scope','fileUpload',function($scope,fileUpload)
      {
	
	
         console.log("i'm in register");
         
         $scope.register=function()
              {
              	 	var file=$scope.myFile;
               		var	username=$scope.username;
              		var	email=$scope.email;
                    var	password=$scope.password;
                    var	country=$scope.country;
               		console.log("username:"+username);
                 	console.log("file is");
                 	console.dir(file);
                  	var uploadUrl="http://localhost:8085/smiley/fileUpload";
                    fileUpload.uploadFileToUrl(file,uploadUrl,username,email,password,country);
                    console.log("link correct");
                  };
                            	
         }]);

smileychat.service('fileUpload',['$http','$location',function($http,$scope,$location)
          {
              this.uploadFileToUrl=function(file,uploadUrl,username,email,password,country)
                  {
                       console.log("link correct");
                       var fd=new FormData();
                       fd.append('file',file);
                       fd.append('username',username);
                       fd.append('email',email);
                       fd.append('password',password);
                       fd.append('country',country);
                       console.log("fd"+fd);
                       $http.post(uploadUrl,fd,{transformRequest:angular.identity,
                                          	    headers:{'Content-Type':undefined}
                                          		})
                                          	    .success(function()
                                          		  {
                                          			$scope.message="u r successfully registerd ..u can login now";
                                          			$scope.username="";
                                          			$scope.password="";
                                          		  })
                                          		.error(function(){});
                   }
                                          	
              }]);
smileychat.directive('fileModel',['$parse',function($parse) {
                                          	return{
                                                  	  link: function(scope, element, attrs) 
                                                  	  {
                                                  	  var model = $parse(attrs.fileModel);
                                                  	  var modelSetter = model.assign;
                                                  	          
                                                  	  element.bind('change', function()
                                                  			  {
                                                  	  scope.$apply(function()
                                                  		{
                                                  	  modelSetter(scope, element[0].files[0]);
                                                  	    });
                                                  	        });
                                                  	   }
                                                   };
                                            }]);

smileychat.run( function ($rootScope, $location,$cookieStore, $http) {

	 $rootScope.$on('$locationChangeStart', function (event, next, current) {
		 console.log("$locationChangeStart")
		
	        var restrictedPage = $.inArray($location.path(), ['/','/search_job','/view_blog','/login', '/register','/list_blog']) === -1;
	        
	        console.log("restrictedPage:" +restrictedPage)
	        var loggedIn = $rootScope.uname;
	        
	        console.log("loggedIn:" +loggedIn)
	        
	        if(!loggedIn)
	        	{
	        	
	        	 if (restrictedPage) {
		        	  console.log("Navigating to login page:")
		        	

						            $location.path('/login');
		                }
	        	}
	        
			 
	        
	 }
	       );
	 	 
	 // keep user logged in after page refresh
  $rootScope.uname = $cookieStore.get('uname') || {};
   if ($rootScope.uname) {
       $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.uname; 
   }
});



 smileychat.controller("blogController",function($scope,$http,$rootScope)
		{
	 $rootScope.careeruser=true;
		$rootScope.blogAdmin=false;
		$rootScope.register=false;
		$rootScope.chat=false;
		$rootScope.applications=false;
		$rootScope.forum=false;
		$rootScope.home=false;
		$rootScope.login=false;
		$rootScope.career=false;
		$rootScope.blog=true;
		$rootScope.logout=true;
		$rootScope.allblogs=true;
		$rootScope.userforum=true;
	//$location.path('/logout');
		console.log("b4 link");
			$http.get("http://localhost:8085/smiley/viewMyBlogs/"+$rootScope.uname).then(function (response) {$scope.blogs = response.data;});
			console.log("after link");
			console.log("blog controller");
			$scope.blog=function()
			{
				var blog={
						blog_Name:$scope.blog_Name,
						blog_Description:$scope.blog_Description,
						postedby:$scope.uname
							}
				console.log("title:"+blog);
            var res=$http.post("http://localhost:8085/smiley/createBlog",blog);
  			$http.get("http://localhost:8085/smiley/viewMyBlogs/"+$rootScope.uname).then(function (response) {$scope.blogs = response.data;});

              res.success(function(data, status, headers, config)
						{
            	  			$scope.message = data;
            	  			console.log("status:"+status);
						});
			
			}
			$scope.editBlog=function(blog)
			{
				console.log("inside editblog");
				console.log("blog:"+blog);
				$scope.blogDataToEdit=blog;
			}
						 		 
			$scope.saveEdit=function()
			{
				var blog = {
		    				blog_Name:$scope.blogDataToEdit.blog_Name,
		    				blog_Description:$scope.blogDataToEdit.blog_Description,
		 					blog_Id:$scope.blogDataToEdit.blog_Id
		 		};
				$http.put('http://localhost:8085/smiley/updateBlog', blog);
				

			$http.get("http://localhost:8085/smiley/viewMyBlogs/"+$rootScope.uname).then(function (response) 
					{
						$scope.blogs = response.data;
						console.log("data:"+response.data);});
					}
			
		$scope.deleteBlog=function(blogDataToEdit)
			{
				console.log("In the delete blog");
				blog_Id:$scope.blogDataToEdit.blog_Id;
				console.log("blog_Id:"+blogDataToEdit.blog_Id);
				//$http.delete('http://localhost:8085/chat/deleteBlog/'+blogDataToEdit.blog_Id);
				
				$http['delete']('http://localhost:8085/smiley/deleteBlog/'+blogDataToEdit.blog_Id);
				$http.get("http://localhost:8085/smiley/viewMyBlogs/"+$rootScope.uname).then(function (response) {$scope.blogs = response.data;});
			}
			
		});
smileychat.controller("adminBlogController",function($scope,$http,$rootScope)	
		{	
	$rootScope.careeruser=false;
	$rootScope.blogAdmin=true;
	$rootScope.register=false;
	$rootScope.chat=false;
	$rootScope.applications=true;
	$rootScope.forum=true;
	$rootScope.home=false;
	$rootScope.login=false;
	$rootScope.career=true;
	$rootScope.blog=false;
	$rootScope.logout=true;
	$rootScope.allblogs=false;
	$rootScope.userforum=false;
	
			console.log(" in adminblog controller");
	
			$http.get("http://localhost:8085/smiley/viewBlogs").then(function (response) 
					{
			    	
			    	$scope.blogs = response.data;
			    	
			    	console.log("data:"+response.data);
					});
			
				$scope.AppDisapp=function(adminblog)
				{
					console.log("inside appdisappblog");
					console.log("adminblog:"+adminblog);
					$scope.blogstatus=adminblog;
				}
				$scope.approveBlog=function()
				{
					console.log("in approveblog");
					var edit=
					{
							blog_Id:$scope.blogstatus.blog_Id,
							blog_Name:$scope.blogstatus.blog_Name,
							blog_Description:$scope.blogstatus.blog_Description,
							postedby:$scope.blogstatus.postedby,
							status:true
					}
				$http.put("http://localhost:8085/smiley/updateBlog",edit);
				$http.get("http://localhost:8085/smiley/viewBlogs").then(function (response) 
						{
	    	
					$scope.blogs = response.data;
	    	
					console.log("data:"+response.data);
						});
				}
				
				
				
			$scope.disapproveBlog=function()
				{
					console.log("in disapproveblog");
					var edit=
					{
							blog_Id:$scope.blogstatus.blog_Id,
							blog_Name:$scope.blogstatus.blog_Name,
							blog_Description:$scope.blogstatus.blog_Description,
							postedby:$scope.blogstatus.postedby,
							status:false
					}
					$http.put("http://localhost:8085/smiley/updateBlog",edit);
					$http.get("http://localhost:8085/smiley/viewBlogs").then(function (response) 
					{
	    	
						$scope.blogs = response.data;
	    	
						console.log("data:"+response.data);
					});
					}

		});	


smileychat.controller("allblogsController",function($scope,$http,$rootScope)	
		{	
	$rootScope.careeruser=true;
	$rootScope.blogAdmin=false;
	$rootScope.register=false;
	$rootScope.chat=true;
	$rootScope.applications=false;
	$rootScope.forum=false;
	$rootScope.home=false;
	$rootScope.login=false;
	$rootScope.career=false;
	$rootScope.blog=true;
	$rootScope.logout=true;
	$rootScope.allblogs=true;
	$rootScope.userforum=true;
	
	
				console.log("username in allmyblog controller:"+$rootScope.username);
				$http.get("http://localhost:8085/smiley/allblog").then(function (response) 
						{
			    	
							$scope.blogs = response.data;
			    	
							console.log("data:"+response.data);
						});
				
				$rootScope.logout=true;
		    	console.log("in view blog")
		    	        
		    	$scope.makeComment=function(allblogs)
		    	      {
		                $scope.commentblog=allblogs;
		    	      }
		    	        
		    	$scope.newComment={}; 
		    	$scope.addComment=function(newComment)
					  {
							var comments = 
							{
					    			blog_Id:$scope.commentblog.blog_Id,
					    			comment:$scope.comment,
					    			username:$rootScope.uname		 				
							}
						console.log("title:"+comments);
				
							
				 $http.post("http://localhost:8085/smiley/makeComment",comments)
				 $http.get("http://localhost:8085/smiley/allblog").then(function (response) 
							{
											$scope.allblogs = response.data;
										console.log("data:"+response.data);
							});
		    	        
		 }
		    		    
		    			$scope.commentsList=function(allblogs)
		    			{ 
		    				console.log("xyzzz")
		    				$scope.viewcomments=allblogs
		    				
		    			$http.get("http://localhost:8085/smiley/viewComments/"+$scope.viewcomments.blog_Id).then(function (response) 
		    						{
		    									    	
		    							$scope.commentlist = response.data;
		    									    	
		    							console.log("data:"+response.data);
		    						});
		    				
		    			}
		    			
		    			 $scope.likeBlog=function(allblogs)
						 { 
							 $scope.allblogslike=allblogs;
							 console.log("category:"+$scope.allblogslike.likes);
							like= $scope.allblogslike.likes;
					       likes=like+1
					       console.log("likes:",likes);
					       $scope.likes=likes;
					       console.log("scope likes:"+$scope.likes);   	
					       var like=
								{
							blog_Id:$scope.allblogslike.blog_Id,
							
							blog_Name:$scope.allblogslike.blog_Name,
							blog_Description:$scope.allblogslike.blog_Description,
							postedby:$scope.allblogslike.postedby,
							status:$scope.allblogslike.status,
							likes:$scope.likes
						
								}
							console.log("data in like:"+like);
							console.log("postedby:"+$rootScope.uname);
							 $http.put('http://localhost:8085/smiley/updateBlog',like);
							 $http.get("http://localhost:8085/smiley/allblog").then(function (response) {$scope.allblogs = response.data;});
						 
						 }
		    			
		    			
		    
			});
		
		
		
		
		
		











smileychat.controller("careerController",function($scope,$http,$rootScope)
		{
	$rootScope.careeruser=false;
	$rootScope.blogAdmin=true;
	$rootScope.register=false;
	$rootScope.chat=true;
	$rootScope.applications=true;
	$rootScope.forum=true;
	$rootScope.home=false;
	$rootScope.login=false;
	$rootScope.career=true;
	$rootScope.blog=false;
	$rootScope.logout=true;
	$rootScope.allblogs=false;
	$rootScope.userforum=false;
	
	//$location.path('/logout');
			$http.get("http://localhost:8085/smiley/viewCareers").then(function (response) {$scope.careers = response.data;});
			console.log("in career controller");
			$scope.job=function()
			{
				var obj={
						job_Role:$scope.job_Role,
						job_Description:$scope.job_Description,
						eligibility:$scope.eligibility
							};
            var res=$http.post("http://localhost:8085/smiley/createJob",obj);
  			$http.get("http://localhost:8085/smiley/viewCareers").then(function (response) {$scope.careers = response.data;});

              res.success(function(data, status, headers, config)
						{
            	  			$scope.message = data;
            	  			console.log("status:"+status);
						});
			
			}
			$scope.editJob=function(career)
			{
				console.log("inside editJob");
				console.log("Career:"+career);
				$scope.careerDataToEdit=career;
			}
						 		 
			$scope.saveEdit=function()
			{
				var job = {
							job_Id:$scope.careerDataToEdit.job_Id,
		    				job_Role:$scope.careerDataToEdit.job_Role,
		    				job_Description:$scope.careerDataToEdit.job_Description,
		 					eligibility:$scope.careerDataToEdit.eligibility
		 		};
				$http.put('http://localhost:8085/smiley/updateCareers', job);
				

			$http.get("http://localhost:8085/smiley/viewCareers").then(function (response) {$scope.careers = response.data;});
			}
			
			
			$scope.deleteJob=function(careerDataToEdit)
			{
				console.log("In the delete Job");
				job_Id:$scope.careerDataToEdit.job_Id;
				console.log("job_Id:"+careerDataToEdit.job_Id);
				
				$http['delete']('http://localhost:8085/smiley/deleteJobs/'+careerDataToEdit.job_Id);
				$http.get("http://localhost:8085/smiley/viewCareers").then(function (response) {$scope.careers = response.data;});
			}
			
		});


smileychat.controller("careeruserController",function($scope,$http,$rootScope)
		{
	$rootScope.careeruser=true;
	$rootScope.blogAdmin=false;
	$rootScope.register=false;
	$rootScope.chat=true;
	$rootScope.applications=false;
	$rootScope.forum=false;
	$rootScope.home=false;
	$rootScope.login=false;
	$rootScope.career=false;
	$rootScope.blog=true;
	$rootScope.logout=true;
	$rootScope.allblogs=true;
	$rootScope.userforum=true;
	//$location.path('/logout');
			$http.get("http://localhost:8085/smiley/viewCareers").then(function (response) {$scope.careers = response.data;});
			console.log("in career user controller");
			 $scope.applyJob=function(aapplications)
			    {
			    	 console.log("applyJob function called");
			    	 var jobData={
			           
			           registrationNumber:$scope.registrationNumber,
			           qualification:$scope.qualification,
			           username:$rootScope.uname,
			           contactNumber:$scope.contactNumber	
			    	 };
			    	 var res = $http.post('http://localhost:8085/smiley/addApplications',jobData);
			    	 
			    }}

);
				
smileychat.controller("applicationsController",function($scope,$http,$rootScope)	
		{	
	$rootScope.careeruser=false;
	$rootScope.blogAdmin=true;
	$rootScope.register=false;
	$rootScope.chat=false;
	$rootScope.applications=true;
	$rootScope.forum=true;
	$rootScope.home=false;
	$rootScope.login=false;
	$rootScope.career=true;
	$rootScope.blog=false;
	$rootScope.logout=true;
	$rootScope.allblogs=false;
	$rootScope.userforum=false;
	console.log("In application Controller");
			 $http.get("http://localhost:8085/smiley/viewApplications")
			    .then(function (response) {$scope.applications = response.data;});
			
			$scope.newApplications={};
			console.log("In application Controller");
			$scope.addApplications=function(newApplications)
			{
				var dataObj = {
						registrationNumber:$scope.registrationNumber,
						qualification:$scope.qualification,
						
						contactNumber:$scope.contactNumber
		 		};
				console.log("title:"+dataObj);
				 var res = $http.post('http://localhost:8085/smiley/addApplications',dataObj);
				 $http.get("http://localhost:8085/smiley/viewApplications")
			 	    .then(function (response) {$scope.applications = response.data;});
			 		res.success(function(data, status, headers, config) {
			 			$scope.message = data;
			 			console.log("status:"+status);
			 		});
			 		 
			};
			$scope.editApplications=function(applications)
			{
				console.log("inside editApplications");
				console.log("applications:"+applications);
				$scope.applicationsDataToEdit=applications;
			}
			$scope.saveEdit=function()
			{
				var dataObj = {
						registrationNumber:$scope.applicationsDataToEdit.registrationNumber,
						qualification:$scope.applicationsDataToEdit.qualification,
		    			contactNumber:$scope.applicationsDataToEdit.contactNumber,
		 				id:$scope.blogDataToEdit.id
		 		};
				$http.put('http://localhost:8085/smiley/updateApplications', dataObj);
				$http.get("http://localhost:8085/smiley/viewApplications")
		 	    .then(function (response) {$scope.applications = response.data;});
			}
			$scope.deleteApplications=function(applicationsDataToEdit)
			{
				console.log("delete applications called");
				var id=$scope.applicationsDataToEdit.id;
				console.log("id is:"+id);
				console.log("id:"+applicationsDataToEdit.id);
				$http['delete']('http://localhost:8085/smiley/deleteApplications/'+id);
				 $http.get("http://localhost:8085/smiley/viewApplications")
			 	    .then(function (response) {$scope.applications = response.data;});
			}
			
		}

		);		

smileychat.controller("adminController",function($scope,$http,$rootScope)
		{
	$rootScope.careeruser=false;
	$rootScope.blogAdmin=true;
	$rootScope.register=false;
	$rootScope.chat=false;
	$rootScope.applications=true;
	$rootScope.forum=true;
	$rootScope.home=false;
	$rootScope.login=false;
	$rootScope.career=true;
	$rootScope.blog=false;
	$rootScope.logout=true;
	$rootScope.allblogs=false;
	$rootScope.userforum=false;
		});
smileychat.controller("homeController",function($scope,$http)
		{
	console.log("in home controller");
		});
smileychat.controller("aboutController",function($scope,$http)
		{
	console.log("in about controller");
		});

smileychat.controller("loginController",['$cookieStore','$scope','$http','$location','$rootScope',function($cookieStore,$scope,$http,$location,$rootScope)
              {
              	console.log("in login controller");
              	$scope.login=function()
              		{
              		
              			var login={
              			username:$scope.username,
              			password:$scope.password
              							
              		} 
              			
             	$http.post("http://localhost:8085/smiley/authenticate",login).then(function(response)
             		{
             			console.log("result data:"+response.data);
                 		 var r=response.data.toString();
             			 console.log("response:"+r);
                				     
                			if(r==1)
                				{

                							
                				$rootScope.careeruser=true;
                				$rootScope.blogAdmin=false;
                				$rootScope.register=false;
                				$rootScope.chat=true;
                				$rootScope.applications=false;
                				$rootScope.forum=false;
                				$rootScope.home=false;
                				$rootScope.login=false;
                				$rootScope.career=false;
                				$rootScope.blog=true;
                				$rootScope.logout=true;
                				$rootScope.allblogs=true;
                				$rootScope.userforum=true;
                					console.log('logout:'+$rootScope.logout);
                					console.log("logged out:"+response.data);
                					console.log("uname from root scope:"+$rootScope.uname);
        							$rootScope.uname=$scope.username;
        							$http.defaults.headers.common['Authorization'] = 'Basic '
        								+ $rootScope.uname;
        						$cookieStore
        								.put(
        										'uname',
        										$rootScope.uname)
        							$rootScope.id=$scope.id;
        							console.log("uname:"+$rootScope.uname);
                					$location.path('/userHome');
                							}
                						if(r==0)
                							{
                							$scope.username="";
                							$scope.password="";
                							$scope.message="username/password incorrect";
                							$location.path('/login');
                							}
                						if(r==2)
                						{
                							$rootScope.careeruser=false;
                            				$rootScope.blogAdmin=true;
                            				$rootScope.register=false;
                            				$rootScope.chat=false;
                            				$rootScope.applications=true;
                            				$rootScope.forum=true;
                            				$rootScope.home=false;
                            				$rootScope.login=false;
                            				$rootScope.career=true;
                            				$rootScope.blog=false;
                            				$rootScope.logout=true;
                            				$rootScope.allblogs=false;
                            				$rootScope.userforum=false;
                							$rootScope.uname=$scope.username;
                							$rootScope.id=$scope.id;
                							console.log("uname:"+$rootScope.uname);
                							$location.path('/admin');
                						}
                							}	
                				 ); 
                							 }
                						}]);
                						


smileychat.controller("forumController",function($scope,$http,$rootScope)
		{
	$http.get("http://localhost:8085/smiley/viewForum").then(function (response) {$scope.forums= response.data;});

	console.log("in forum");
	$rootScope.careeruser=false;
	$rootScope.blogAdmin=true;
	$rootScope.register=false;
	$rootScope.chat=true;
	$rootScope.applications=true;
	$rootScope.forum=true;
	$rootScope.home=false;
	$rootScope.login=false;
	$rootScope.career=true;
	$rootScope.blog=false;
	$rootScope.logout=true;
	$rootScope.allblogs=false;
	$rootScope.userforum=false;
	
	$scope.addForum=function()
	{
		var forum={
				question_Name:$scope.question_Name
				//question_Description:$scope.question_Description
				
					};
		var res=$http.post("http://localhost:8085/smiley/createForum",forum); 
		$http.get("http://localhost:8085/smiley/viewForum").then(function (response) {$scope.forums = response.data;});
		res.success(function(data, status, headers, config) 
				{
					$scope.message = data;
					console.log("status:"+status);
				});
	}
	$scope.editForum=function(forum)
	{
		console.log("inside editforum");
		console.log("forum:"+forum);
		$scope.forumDataToEdit=forum;
	}
	$scope.saveEdit=function()
	{
		var forum={
				question_Id:$scope.forumDataToEdit.question_Id,
				question_Name:$scope.forumDataToEdit.question_Name
				//question_Description:$scope.forumDataToEdit.question_Description
		};
	$http.put('http://localhost:8085/smiley/updateForum',forum);
	$http.get("http://localhost:8085/smiley/viewForum").then(function (response) {$scope.forums = response.data;});
	}
	$scope.deleteForum=function(forumDataToEdit)
	{
		console.log("delete forum called");
		question_Id:$scope.forumDataToEdit.question_Id;
		console.log("question_Id:"+forumDataToEdit.question_Id);
		$http['delete']('http://localhost:8085/smiley/deleteForum/'+forumDataToEdit.question_Id);
		$http.get("http://localhost:8085/smiley/viewForum").then(function (response) {$scope.forums = response.data;});
	}
	});
smileychat.controller("userHomeController",function($scope,$http,$rootScope)	
		{	
	$rootScope.careeruser=true;
	$rootScope.blogAdmin=false;
	$rootScope.register=false;
	$rootScope.chat=true;
	$rootScope.applications=false;
	$rootScope.forum=false;
	$rootScope.home=false;
	$rootScope.login=false;
	$rootScope.career=false;
	$rootScope.blog=true;
	$rootScope.logout=true;
	$rootScope.allblogs=true;
	$rootScope.userforum=true;
		
	console.log("in userHome controller");
	console.log("name in  friendslist:"+$rootScope.uname);
	
	 $http.get("http://localhost:8085/smiley/viewFriends/"+$rootScope.uname)
	    .then(function (response) {
	    	
	    	$scope.friendslist = response.data;
	    	
	    	console.log("data:"+response.data);}
	    );
	 $http.get("http://localhost:8085/smiley/viewCareers").then(function (response) {$scope.careers = response.data;});
	$scope.findfriends=function()
	{
	console.log(" in findfriends function");
	console.log("name in  findfriends:"+$rootScope.uname);
			 $http.get("http://localhost:8085/smiley/findFriends/"+$rootScope.uname)
			    .then(function (response) {
			    	
			    	$scope.friends = response.data;
			    	
			    	console.log("data:"+response.data);
			    
			    });
	}
	
	$scope.addfriend=function(user)
	{
		console.log("in addfriend");
		$scope.friend=user;
		
		console.log("friendname:"+$scope.friend.username);
		console.log("username:"+$rootScope.uname);
		var dosth=
			{
				username:$rootScope.uname,
				friend_Name:$scope.friend.username
			}
		$http.post("http://localhost:8085/smiley/addFriend/",dosth);
	}
	$scope.applyJob=function(aapplications)
	{
		 console.log("applyJob function called");
		 var jobData={
	       
	       registrationNumber:$scope.registrationNumber,
	       qualification:$scope.qualification,
	       username:$rootScope.uname,
	       contactNumber:$scope.contactNumber	
		 };
		 var res = $http.post('http://localhost:8085/smiley/addApplications',jobData);
		 
	}
	
	
	});

smileychat.controller("userforumController",function($scope,$http,$rootScope)	
		{	
	$rootScope.careeruser=true;
	$rootScope.blogAdmin=false;
	$rootScope.register=false;
	$rootScope.chat=true;
	$rootScope.applications=false;
	$rootScope.forum=false;
	$rootScope.home=false;
	$rootScope.login=false;
	$rootScope.career=false;
	$rootScope.blog=true;
	$rootScope.logout=true;
	$rootScope.allblogs=true;
	$rootScope.userforum=true;
	
	
		console.log("username in userforum controller:"+$rootScope.username);
		$http.get("http://localhost:8085/smiley/viewForum").then(function (response){	$scope.forums = response.data;
		
		console.log("data:"+response.data);
						});
				
			$rootScope.logout=true;
	    	console.log("in view blog")
	    	        
	    	$scope.makeComment=function(foru)
	    	      {
	                $scope.commentforum=foru;
	    	      }
	    	        
	    	$scope.newComment={}; 
	    	$scope.addComment=function(newComment)
				  {
						var comments = 
						{
				    			question_Id:$scope.commentforum.question_Id,
				    			comment:$scope.comment,
				    			username:$rootScope.uname		 				
						}
					console.log("title:"+comments);
			
						
			 $http.post("http://localhost:8085/smiley/makeComment",comments)
			 $http.get("http://localhost:8085/smiley/viewForum").then(function (response) 
						{
										$scope.foru = response.data;
									console.log("data:"+response.data);
						});
	    	        
	    		}
	    		    
	    			$scope.commentsList=function(foru)
	    			{ 
	    				console.log("xyzzz")
	    				$scope.viewcomment=foru
	    				
	    			$http.get("http://localhost:8085/smiley/viewComment/"+$scope.viewcomment.question_Id).then(function (response) 
	    						{
	    									    	
	    							$scope.commentlist = response.data;
	    									    	
	    							console.log("data:"+response.data);
	    						});
	    				
	    			}
	    			
	    			
	    			
	    
		});



smileychat.controller('logoutController',function($scope,$rootScope,$http,$cookieStore) 
					{
	$rootScope.uname=null;
	console.log("uname in cookie"+$cookieStore.get('uname'));
	$cookieStore.remove('uname');
	console.log("uname in cookie"+$cookieStore.get('uname'));
	$rootScope.uname=null;
	$rootScope.careeruser=false;
 	$rootScope.career=false;
	$rootScope.login=true;
	$rootScope.register=true;
	$rootScope.allblogs=false;		
	$rootScope.logout=false;
	$rootScope.blog=false;
	$rootScope.forum=false;
	$rootScope.userforum=false;
	$http.post("http://localhost:8085/smiley/logout/"+$rootScope.uname);
	
			});
		
		



smileychat.service("ChatService", function($q, $timeout) {
    
    var service = {}, listener = $q.defer(), socket = {
      client: null,
      stomp: null
    }, messageIds = [];
    
    service.RECONNECT_TIMEOUT = 30000;
    service.SOCKET_URL = "/smiley/chat";
    service.CHAT_TOPIC = "/topic/message";
    service.CHAT_BROKER = "/app/chat";
    
    service.receive = function() {
      return listener.promise;
    };
    
    service.send = function(message) {
    	console.log("in send function");
      var id = Math.floor(Math.random() * 1000000);
      socket.stomp.send(service.CHAT_BROKER, {
        priority: 9
      }, JSON.stringify({
        message: message,
        id: id
      }));
      messageIds.push(id);
    };
    
    var reconnect = function() {
      $timeout(function() {
        initialize();
      }, this.RECONNECT_TIMEOUT);
    };
    
    var getMessage = function(data) {
      var message = JSON.parse(data), out = {};
      out.message = message.message;
      out.username = message.username;
      out.time = new Date(message.time);
      if (_.contains(messageIds, message.id)) {
        out.self = true;
        messageIds = _.remove(messageIds, message.id);
      }
      return out;
    };
    
    var startListener = function() {
      socket.stomp.subscribe(service.CHAT_TOPIC, function(data) {
        listener.notify(getMessage(data.body));
      });
    };
    
    var initialize = function() {
      socket.client = new SockJS(service.SOCKET_URL);
      socket.stomp = Stomp.over(socket.client);
      socket.stomp.connect({}, startListener);
      socket.stomp.onclose = reconnect;
    };
    
    initialize();
    return service;
  });
smileychat.controller("chatController",function($scope,$http,ChatService)
		{
	
	console.log("in chat  controller");
	$scope.messages = [];
	  $scope.message = "";
	  $scope.max = 140;
	  
	  $scope.addMessage = function() {
		  console.log("in addmessage fn");
	    ChatService.send($scope.message);
	    $scope.message = "";
	  };

	  ChatService.receive().then(null, null, function(message) {
		  console.log("inside recieeve:"+message);
		  console.log("inside recieeve:"+$scope.message);
	    $scope.messages.push(message);
	  });
	}
		);















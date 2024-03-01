Login 
url:https://harmanos.onrender.com/instructorlogin,
details: takes email, password. checks if user exists of not, validate password, send token
description: in this route user can enter their email and password to acces the future route. 

Add Instructor
url:https://harmanos.onrender.com/instructor/register,
details: takes req.body. checks if user exists of not, create new Instructor
description: in this route only admin can create the route. 

Get all Instructor
url:https://harmanos.onrender.com/instructor/getall,
details: check if admin, send only users who are not admin
description: this route can only be acces after login as a admin or error.

Get a instructor 
url:https://harmanos.onrender.com/instructor/ins/:id,
details: takes Id check it, if user exits or not,find lecture related to instructor, send. 
description:this route can only be acces after login or error. 

Logout 
url:https://harmanos.onrender.com/instructor/logout,
details: if cookie exits?, cookie valid?, clears cookie,send plain response
description: checks if cookie exist and valid after that it deletes cookie, need to be looged in to access this.

Create Course 
url:https://harmanos.onrender.com/course/add,
details: check req.file, create course, create leacture with course._id.
description:takes file create new course and lecture with instructor id and save it.

Get all Course 
url:https://harmanos.onrender.com/course/get-all,
details: check if admin, send all the courses
description: this route can only be acces after login as a admin or error.

Get a Course 
url:https://harmanos.onrender.com/course/get/:id,
details: takes Id check it, if course exits or not, send details about course profile and realated lectures. 
description:this route can only be acces after login or error. 

Add lecture to Course
url:https://harmanos.onrender.com/course/add,
details: find course by id. creates lecture with instructorid, send.
description:find course by id. create a leature with instructor id and course id plus date. send.

use GroupLinkDB;
GO
declare @v_id int;
declare @v_id2 int;

insert into Users(name, surname, email, login, password) values ('mateusz', 'nowy', 'm@nowy', 'mnowy', '123')

insert into Lecturers(name, surname) values ('Tomasz', 'Wysoczanski')

insert into ClassSchedules(dayOfTheWeek, startTime, endTime, type) values ('Tuesday', '10:15', '12:30', 'TP')

set @v_id = (select Max(lect.idLecturer) from Lecturers lect 
where lect.name like 'Tomasz' and lect.surname like 'Wysoczanski')

set @v_id2 = (select Max(cl.idClassSchedule) from ClassSchedules cl
where cl.dayOfTheWeek = 'Tuesday' and cl.startTime like '10:15')

insert into Courses(idLecturer, idClassSchedule, courseName, groupCode, courseCode) values (@v_id, @v_id2,
'Modelowanie i analiza systemow informatycznych', 'PN15051', '95195195151f')

set @v_id = (select Max(users.idUser) from Users users where users.login = 'mnowy' )

set @v_id2 = (select Max(course.idCourse) from Courses course where course.groupCode like 'PN15051')

insert into Notifications(idCourse, idUser, title, content, amount) values(@v_id2, @v_id,
'Projekt z aplikacji webowej', 'Potrzeba dwóch frontów i trzech backendowców', 5)

select * from Notifications


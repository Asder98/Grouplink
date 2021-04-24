use GroupLinkDB;
GO
declare @v_id int;
declare @v_id2 int;

insert into Users(name, surname, email, login, password) values ('filip', 'nowy', 'm@nowy', 'mnowy', '123')

insert into Lecturers(name, surname) values ('dobry', 'prowadzacy')

insert into ClassSchedules(dayOfTheWeek, startTime, endTime, type) values ('Tuesday', '10:30', '12:30', 'TP')

set @v_id = (select Max(lect.idLecturer) from Lecturers lect 
where lect.name like 'dobry' and lect.surname like 'prowadzacy')

set @v_id2 = (select Max(cl.idClassSchedule) from ClassSchedules cl
where cl.dayOfTheWeek = 'Tuesday' and cl.startTime like '10:30')

insert into Courses(idLecturer, idClassSchedule, courseName, groupCode, courseCode) values (@v_id, @v_id2,
'Ciekawy Kurs', 'hs363f', 't32t367g')

set @v_id = (select Max(users.idUser) from Users users where users.login = 'mnowy' )

set @v_id2 = (select Max(course.idCourse) from Courses course where course.groupCode like 'hs363f')

insert into Notifications(idCourse, idUser, title, content, amount) values(@v_id2, @v_id,
'Projekt z aplikacji webowej', 'Potrzebny frontendowiec', 1)

select * from Notifications


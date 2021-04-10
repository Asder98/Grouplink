USE master;
GO

IF DB_ID('GroupLinkDB') IS NOT NULL
	drop database GroupLinkDB;

CREATE DATABASE GroupLinkDB;

USE GroupLinkDB;

-- Table Users 
CREATE TABLE Users (
	idUser int NOT NULL PRIMARY KEY IDENTITY(1,1),
	name varchar(20) NOT NULL,
	surname varchar(20) NOT NULL,
	email varchar(50) NOT NULL,
	login varchar(20) NOT NULL,
	password varchar(30) NOT NULL,
)

-- Table Lecturers 
CREATE TABLE Lecturers (
	idLecturer int NOT NULL PRIMARY KEY IDENTITY(1,1),
	name varchar(20) NOT NULL,
	surname varchar(20) NOT NULL,
	email varchar(50) NULL,
)

CREATE TABLE ClassSchedules (
	idClassSchedule int NOT NULL PRIMARY KEY IDENTITY(1,1), 
	dayOfTheWeek varchar(20) NOT NULL,
	startTime varchar(10) NOT NULL,
	endTime varchar(10) NOT NULL,
	type varchar(5) NOT NULL
)

-- Table Courses
CREATE TABLE Courses (
	idCourse int NOT NULL PRIMARY KEY IDENTITY(1,1),
	idLecturer int NOT NULL,
	groupCode varchar(10) NOT NULL,
	courseCode varchar(20) NULL,
	groupMixingType varchar(10) NULL,
	idClassSchedule int NOT NULL

	CONSTRAINT FK_CourseLecturer FOREIGN KEY (idLecturer)
    REFERENCES Lecturers(idLecturer),

	CONSTRAINT FK_CourseSchedule FOREIGN KEY (idClassSchedule)
    REFERENCES ClassSchedules(idClassSchedule)
)

-- Table UsersCourses 
CREATE TABLE UsersCourses (
	idUserCourse int NOT NULL PRIMARY KEY IDENTITY(1,1),
	idCourse int NOT NULL,
	idUser int NOT NULL,

	CONSTRAINT FK_UsersCourses_Course FOREIGN KEY (idCourse) 
	REFERENCES Courses(idCourse),

	CONSTRAINT FK_UsersCourses_User FOREIGN KEY (idUser) 
	REFERENCES Users(idUser)
)

-- Table Notifications
CREATE TABLE Notifications (
	idNotification int NOT NULL PRIMARY KEY IDENTITY(1,1),
	idUser int NOT NULL,
	idCourse int NOT NULL,
	title varchar(40) NULL,
	content varchar(255) NULL,
	type varchar(20),
	amount int NULL

	CONSTRAINT FK_UserNotification FOREIGN KEY (idUser) 
	REFERENCES Users(idUser),

	CONSTRAINT FK_CourseNotification FOREIGN KEY (idCourse) 
	REFERENCES Courses(idCourse)
)

GO
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

-- Table Courses
CREATE TABLE Courses (
	idCourse int NOT NULL PRIMARY KEY IDENTITY(1,1),
	idLecturer int NOT NULL,
	groupCode varchar(10) NOT NULL,
	courseCode varchar(20) NULL,
	startDate Date NOT NULL,
	groupMixingType varchar(10) NULL,
	weekType varchar(5) NOT NULL,

	CONSTRAINT FK_CourseLecturer FOREIGN KEY (idLecturer)
    REFERENCES Lecturers(idLecturer)
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

	CONSTRAINT FK_UserNotification FOREIGN KEY (idUser) 
	REFERENCES Users(idUser),

	CONSTRAINT FK_CourseNotification FOREIGN KEY (idCourse) 
	REFERENCES Courses(idCourse)
)

GO
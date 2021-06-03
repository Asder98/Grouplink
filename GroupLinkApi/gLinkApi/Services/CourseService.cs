using Dtos;
using Entities;
using GroupLinkApi.Database.Repositories.CourseRepository;
using GroupLinkApi.Database.Repositories.LectureRepository;
using GroupLinkApi.Database.Repositories.ClassScheduleRepository;
using GroupLinkApi.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;
using GroupLinkApi.Database.Repositories.UserCourseRepository;
using GroupLinkApi.Database.Repositories;

namespace GroupLinkApi.Services
{
    public class CourseService : ICourseService
    {
        private readonly ICourseRepository _courseRepository;
        private readonly ILectureRepository _lectureRepository;
        private readonly IClassScheduleRepository _classScheduleRepository;
        private readonly IUserRepository _userRepository; 
        private readonly IUserCourseRepository _userCourseRepository;

        public CourseService(ICourseRepository courseRepository, ILectureRepository lectureRepository, IClassScheduleRepository classScheduleRepository, IUserRepository userRepository, IUserCourseRepository userCourseRepository)
        {
            _courseRepository = courseRepository;
            _lectureRepository = lectureRepository;
            _classScheduleRepository = classScheduleRepository;
            _userRepository = userRepository;
            _userCourseRepository = userCourseRepository;
        }

        public bool IsCourseExist(CourseModel courseModelToCheck)
        {
            var existCourse = _courseRepository.GetCourse(new Courses
            {
                courseName = courseModelToCheck.courseName,
                groupCode = courseModelToCheck.groupCode,
                courseCode = courseModelToCheck.courseCode,
                groupMixingType = courseModelToCheck.groupMixingType
            });


            if (existCourse == null)
                return false;
            else
            {
                if(existCourse.Lecturers == null)
                    return false;
                else
                {
                    if ( !(courseModelToCheck.lecturerSurname.Equals(existCourse.Lecturers.surname) &&
                        courseModelToCheck.lecturerName.Equals(existCourse.Lecturers.name)))
                        return false;
                    


                    if (existCourse.ClassSchedules == null)
                        return false;
                    else
                    {
                        if ( !(courseModelToCheck.dayOfTheWeek.Equals(existCourse.ClassSchedules.dayOfTheWeek) &&
                           courseModelToCheck.startTime.Equals(existCourse.ClassSchedules.startTime) &&
                           courseModelToCheck.endTime.Equals(existCourse.ClassSchedules.endTime) &&
                           courseModelToCheck.type.Equals(existCourse.ClassSchedules.type)))
                            return false;

                        return true;
                    }
                }
            }
        }

        public bool AddCourse(CourseModel courseModel)
        {
            ClassSchedules classSchedules = new ClassSchedules {
                dayOfTheWeek = courseModel.dayOfTheWeek,
                startTime = courseModel.startTime,
                endTime = courseModel.endTime,
                type = courseModel.type
            };

            Lecturers lecturers = new Lecturers { 
                name = courseModel.lecturerName,
                surname = courseModel.lecturerSurname,
                email = courseModel.lecturerEmail
            };


            //get id or create
            int idClassSchedule = _classScheduleRepository.GetId(classSchedules);
            if (idClassSchedule == 0)
            {
                var res = _classScheduleRepository.Add(classSchedules);
                if (!res.Result)
                    return res.Result;
                idClassSchedule = _classScheduleRepository.GetId(classSchedules);
            }

            //get id or create
            int idLecturer = _lectureRepository.GetId(lecturers);
            if (idLecturer == 0)
            {
                var res = _lectureRepository.Add(lecturers);
                if (!res.Result)
                    return res.Result;
                idLecturer = _lectureRepository.GetId(lecturers);
            }

            Courses courses = new Courses()
            {
                idLecturer = idLecturer,
                courseName = courseModel.courseName,
                groupCode = courseModel.groupCode,
                courseCode = courseModel.courseCode,
                groupMixingType = courseModel.groupMixingType,
                idClassSchedule = idClassSchedule
            };

            var result = _courseRepository.Add(courses);


            if(result.Result)
            {
                var idCourse = _courseRepository.GetId(courses);
                var idUser = _userRepository.GetUserId(courseModel.userLogin);

                //jesli uzytkownik o tym loginie nie istnieje to kurs nie zostaje do nikogo przypisany
                if (idUser == 0)
                    return true;

                if (idCourse == 0)
                    return false;
                else
                {
                    var res = _userCourseRepository.Add(new UsersCourses
                    {
                        idCourse = idCourse,
                        idUser = idUser
                    });

                    return res.Result;
                }
            }
            else 
                return false;
        }

        public bool AssignCourse(CourseModel courseModel)
        {
            ClassSchedules classSchedules = new ClassSchedules
            {
                dayOfTheWeek = courseModel.dayOfTheWeek,
                startTime = courseModel.startTime,
                endTime = courseModel.endTime,
                type = courseModel.type
            };

            Lecturers lecturers = new Lecturers
            {
                name = courseModel.lecturerName,
                surname = courseModel.lecturerSurname,
                email = courseModel.lecturerEmail
            };

            //get id
            int idClassSchedule = _classScheduleRepository.GetId(classSchedules);
            if (idClassSchedule == 0)
                return false;

            //get id
            int idLecturer = _lectureRepository.GetId(lecturers);
            if (idLecturer == 0)
                return false;

            Courses courses = new Courses()
            {
                idLecturer = idLecturer,
                courseName = courseModel.courseName,
                groupCode = courseModel.groupCode,
                courseCode = courseModel.courseCode,
                groupMixingType = courseModel.groupMixingType,
                idClassSchedule = idClassSchedule
            };

            var courseFromDB = _courseRepository.GetCourse(courses);


            if (courseFromDB != null)
            {
                var idUser = _userRepository.GetUserId(courseModel.userLogin);

                var res = _userCourseRepository.Add(new UsersCourses
                {
                    idCourse = courseFromDB.idCourse,
                    idUser = idUser
                });

                return res.Result;
            }
            else
                return false;
        }

        public async Task<List<CourseModel>> GetCoursesByLogin(string login)
        {
            List<UsersCourses> usersCourses = await _userCourseRepository.GetCoursesByLogin(login);

            List <CourseModel> courseModel = new List<CourseModel>();


            foreach(UsersCourses userCourses in usersCourses)
            {
                courseModel.Add(new CourseModel
                {
                    userLogin = login,
                    idCourse = userCourses.Courses.idCourse,
                    courseName = userCourses.Courses.courseName,
                    groupCode = userCourses.Courses.groupCode,
                    courseCode = userCourses.Courses.courseCode,
                    groupMixingType = userCourses.Courses.groupMixingType,
                    dayOfTheWeek = userCourses.Courses.ClassSchedules.dayOfTheWeek,
                    startTime = userCourses.Courses.ClassSchedules.startTime,
                    endTime = userCourses.Courses.ClassSchedules.endTime,
                    type = userCourses.Courses.ClassSchedules.type,
                    lecturerName = userCourses.Courses.Lecturers.name,
                    lecturerSurname = userCourses.Courses.Lecturers.surname,
                    lecturerEmail = userCourses.Courses.Lecturers.email
                });
            }



            return courseModel;
        }

        public async Task<List<CourseModel>> UserCourseByFilter(CourseModel courseModel)
        {
            List<UsersCourses> usersCourses = await _userCourseRepository.GetAllUserCourseDataByFilter(courseModel);
            List<CourseModel> cousesModels = new List<CourseModel>();

            foreach(UsersCourses course in usersCourses)
            {
                cousesModels.Add(new CourseModel
                {
                    userLogin = course.Users.login,

                    idCourse = course.Courses.idCourse,
                    courseName = course.Courses.courseName,
                    groupCode = course.Courses.groupCode,
                    courseCode = course.Courses.courseCode,
                    groupMixingType = course.Courses.groupMixingType,

                    dayOfTheWeek = course.Courses.ClassSchedules.dayOfTheWeek,
                    startTime = course.Courses.ClassSchedules.startTime,
                    endTime = course.Courses.ClassSchedules.endTime,
                    type = course.Courses.ClassSchedules.type,

                    lecturerName = course.Courses.Lecturers.name,
                    lecturerSurname = course.Courses.Lecturers.surname,
                    lecturerEmail = course.Courses.Lecturers.email
                });
            }

            return cousesModels;
        }

        public async Task<List<CourseModel>> CoursesByFilter(CourseModel courseModel)
        {            
            List<Courses> courses = await _courseRepository.GetAllCourseDataByFilter(courseModel);

            List<CourseModel> cousesModels = new List<CourseModel>();

            foreach (Courses course in courses)
            {
                cousesModels.Add(new CourseModel
                {
                    userLogin = "",

                    idCourse = course.idCourse,
                    courseName = course.courseName,
                    groupCode = course.groupCode,
                    courseCode = course.courseCode,
                    groupMixingType = course.groupMixingType,

                    dayOfTheWeek = course.ClassSchedules.dayOfTheWeek,
                    startTime = course.ClassSchedules.startTime,
                    endTime = course.ClassSchedules.endTime,
                    type = course.ClassSchedules.type,

                    lecturerName = course.Lecturers.name,
                    lecturerSurname = course.Lecturers.surname,
                    lecturerEmail = course.Lecturers.email
                });
            }
            
            return cousesModels;
        }





}


}

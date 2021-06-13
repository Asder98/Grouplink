using Dtos;
using Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupLinkApi.Database.Repositories.UserCourseRepository
{
    public class UserCourseRepository : BasicRepository<UsersCourses>, IUserCourseRepository
    {        
        public UserCourseRepository(GroupLinkContext context, ILogger<BasicRepository<UsersCourses>> logger) : base(context, logger) { }

        public async Task<List<UsersCourses>> GetCoursesByLogin(string login)
        {
            List<UsersCourses> courses = new List<UsersCourses>();
            if (DatabaseCorrectness().Result)
            {
                courses = await _context.UsersCourses
                    .Include(x => x.Users)
                    .Include(x => x.Courses).ThenInclude(x => x.Lecturers)
                    .Include(x => x.Courses).ThenInclude(x => x.ClassSchedules)
                    .Where(x => x.Users.login == login)
                .ToListAsync();

            }
            return courses;
        }

        public async Task<List<UsersCourses>> GetAllUserCourseDataByFilter(CourseModel model)
        {
            List<UsersCourses> courses = new List<UsersCourses>();
            if (DatabaseCorrectness().Result)
            {
                var query = _context.UsersCourses
                            .Include(x => x.Users)
                            .Include(x => x.Courses).ThenInclude(x => x.Lecturers)
                            .Include(x => x.Courses).ThenInclude(x => x.ClassSchedules).AsQueryable();

                if (!string.IsNullOrEmpty(model.userLogin))
                    query = query.Where(x => x.Users.login.StartsWith(model.userLogin));

                if (!string.IsNullOrEmpty(model.courseName))
                    query = query.Where(x => x.Courses.courseName.StartsWith(model.courseName));

                if (!string.IsNullOrEmpty(model.groupCode))
                    query = query.Where(x => x.Courses.groupCode.StartsWith(model.groupCode));

                if (!string.IsNullOrEmpty(model.courseCode))
                    query = query.Where(x => x.Courses.courseCode.StartsWith(model.courseCode));

                if (!string.IsNullOrEmpty(model.groupMixingType))
                    query = query.Where(x => x.Courses.groupMixingType.StartsWith(model.groupMixingType));


                if (!string.IsNullOrEmpty(model.dayOfTheWeek))
                    query = query.Where(x => x.Courses.ClassSchedules.dayOfTheWeek.StartsWith(model.dayOfTheWeek));

                if (!string.IsNullOrEmpty(model.startTime))
                    query = query.Where(x => x.Courses.ClassSchedules.startTime.StartsWith(model.startTime));

                if (!string.IsNullOrEmpty(model.endTime))
                    query = query.Where(x => x.Courses.ClassSchedules.endTime.StartsWith(model.endTime));

                if (!string.IsNullOrEmpty(model.type))
                    query = query.Where(x => x.Courses.ClassSchedules.type.StartsWith(model.type));


                if (!string.IsNullOrEmpty(model.lecturerName))
                    query = query.Where(x => x.Courses.Lecturers.name.StartsWith(model.lecturerName));

                if (!string.IsNullOrEmpty(model.lecturerSurname))
                    query = query.Where(x => x.Courses.Lecturers.surname.StartsWith(model.lecturerSurname));

                if (!string.IsNullOrEmpty(model.lecturerEmail))
                    query = query.Where(x => x.Courses.Lecturers.email.StartsWith(model.lecturerEmail));


                courses = await query.ToListAsync();
            }
            return courses;
        }

        public async Task<List<UsersCourses>> GetUserCourses(UsersCourses model)
        {
            List<UsersCourses> usersCourses = new List<UsersCourses>();
            if (DatabaseCorrectness().Result)
            {
                usersCourses = await _context.UsersCourses
                    .Where(x => 
                        x.idCourse == model.idCourse &&
                        x.idUser == model.idUser)
                .ToListAsync();

            }
            return usersCourses;
        }
    }
}

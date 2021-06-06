using Dtos;
using Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupLinkApi.Database.Repositories.CourseRepository
{
    public class CourseRepository : BasicRepository<Courses>, ICourseRepository
    {
        public CourseRepository(GroupLinkContext context, ILogger<BasicRepository<Courses>> logger) : base(context, logger) { }

        public int GetId(Courses courseToGet)
        {
            Courses course = new Courses();
            course = _context.Courses.Where(x =>
                x.courseName == courseToGet.courseName &&
                x.groupCode == courseToGet.groupCode &&
                x.courseCode == courseToGet.courseCode &&
                x.groupMixingType == courseToGet.groupMixingType).FirstOrDefault();

            if (course == null)
                return 0;
            else
                return course.idCourse;
        }
        public async Task<List<Courses>> GetCoursesByLogin(string login)
        {
            List<Courses> courses = new List<Courses>();
            if (DatabaseCorrectness().Result)
            {
                courses = await _context.Courses.Include(x => x.Lecturers)
                .ToListAsync();

            }
            return courses;
        }

        public async Task<List<Courses>> GetCourses(string groupOrCourseCode)
        {
            List<Courses> courses = new List<Courses>();
            if (DatabaseCorrectness().Result)
            {
                if(string.IsNullOrEmpty(groupOrCourseCode))
                {
                    courses = await _context.Courses.ToListAsync();
                }
                else
                {
                    courses = await _context.Courses.Where(x =>
                    x.groupCode.StartsWith(groupOrCourseCode) ||
                    x.courseCode.StartsWith(groupOrCourseCode))
                    .ToListAsync();
                }
                
            }
            return courses;
        }

        public Courses GetCourse(Courses courseData)
        {
            if (_context.Courses.Any())
            {
                Courses course = new Courses();
                course = _context.Courses
                    .Include(x => x.ClassSchedules)
                    .Include(x => x.Lecturers)
                    .Where(x => x.courseName == courseData.courseName &&
                    x.groupCode == courseData.groupCode &&
                    x.courseCode == courseData.courseCode &&
                    x.groupMixingType == courseData.groupMixingType).FirstOrDefault();

                return course;
            }
            else
                return null;

        }
        public async Task<List<Courses>> GetAllCourseDataByFilter(CourseModel model)
        {
            List<Courses> courses = new List<Courses>();
            if (DatabaseCorrectness().Result)
            {
                var query = _context.Courses
                            .Include(x => x.Lecturers)
                            .Include(x => x.ClassSchedules).AsQueryable();

                if (!string.IsNullOrEmpty(model.courseName))
                    query = query.Where(x => x.courseName.StartsWith(model.courseName));

                if (!string.IsNullOrEmpty(model.groupCode))
                    query = query.Where(x => x.groupCode.StartsWith(model.groupCode));

                if (!string.IsNullOrEmpty(model.courseCode))
                    query = query.Where(x => x.courseCode.StartsWith(model.courseCode));

                if (!string.IsNullOrEmpty(model.groupMixingType))
                    query = query.Where(x => x.groupMixingType.StartsWith(model.groupMixingType));


                if (!string.IsNullOrEmpty(model.dayOfTheWeek))
                    query = query.Where(x => x.ClassSchedules.dayOfTheWeek.StartsWith(model.dayOfTheWeek));

                if (!string.IsNullOrEmpty(model.startTime))
                    query = query.Where(x => x.ClassSchedules.startTime.StartsWith(model.startTime));

                if (!string.IsNullOrEmpty(model.endTime))
                    query = query.Where(x => x.ClassSchedules.endTime.StartsWith(model.endTime));

                if (!string.IsNullOrEmpty(model.type))
                    query = query.Where(x => x.ClassSchedules.type.StartsWith(model.type));


                if (!string.IsNullOrEmpty(model.lecturerName))
                    query = query.Where(x => x.Lecturers.name.StartsWith(model.lecturerName));

                if (!string.IsNullOrEmpty(model.lecturerSurname))
                    query = query.Where(x => x.Lecturers.surname.StartsWith(model.lecturerSurname));

                if (!string.IsNullOrEmpty(model.lecturerEmail))
                    query = query.Where(x => x.Lecturers.email.StartsWith(model.lecturerEmail));


                courses = await query.ToListAsync();
            }
            return courses;
        }


        public Courses GetCourse(int id)
        {
            Courses courses = new Courses();
            if (DatabaseCorrectness().Result)
            {
                courses = _context.Courses
                            .Include(x => x.Lecturers)
                            .Include(x => x.ClassSchedules)
                            .Where(x => x.idCourse == id)
                            .FirstOrDefault();
            }
            return courses;
        }
    }
}

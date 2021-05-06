using Dtos;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupLinkApi.Database.Repositories.CourseRepository
{
    public interface ICourseRepository : IBasicRepository<Courses>
    {
        Task<List<Courses>> GetCoursesByLogin(string login);
        Task<List<Courses>> GetCourses(string groupOrCourseCode);
        int GetId(Courses courseToGet);
        Courses GetCourse(Courses courseData);
        Task<List<Courses>> GetAllCourseDataByFilter(CourseModel model);
    }
}

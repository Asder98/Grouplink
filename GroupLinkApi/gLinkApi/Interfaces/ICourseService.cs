using Entities;
using Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupLinkApi.Interfaces
{
    public interface ICourseService
    {
        bool IsCourseExist(CourseModel courseModelToCheck);
        bool AddCourse(CourseModel courseModel);
        Task<List<CourseModel>> GetCoursesByLogin(string login);
        Task<List<CourseModel>> UserCourseByFilter(CourseModel courseModel);
        Task<List<CourseModel>> CoursesByFilter(CourseModel courseModel);
    }
}

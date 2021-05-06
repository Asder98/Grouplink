using Dtos;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupLinkApi.Database.Repositories.UserCourseRepository
{
    public interface IUserCourseRepository : IBasicRepository<UsersCourses>
    {
        Task<List<UsersCourses>> GetCoursesByLogin(string login);
        Task<List<UsersCourses>> GetAllUserCourseDataByFilter(CourseModel model);
    }
}

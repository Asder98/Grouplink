using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupLinkApi.Database.Repositories.ClassScheduleRepository
{
    public interface IClassScheduleRepository : IBasicRepository<ClassSchedules>
    {
        int GetId(ClassSchedules classScheduleToCheck);
    }
}

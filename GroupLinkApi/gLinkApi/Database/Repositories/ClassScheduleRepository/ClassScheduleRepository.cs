using Entities;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupLinkApi.Database.Repositories.ClassScheduleRepository
{
    public class ClassScheduleRepository : BasicRepository<ClassSchedules>, IClassScheduleRepository
    {
        public ClassScheduleRepository(GroupLinkContext context, ILogger<BasicRepository<ClassSchedules>> logger) : base(context, logger) { }

        public int GetId(ClassSchedules classScheduleToCheck)
        {
            ClassSchedules classSchedule = _context.ClassSchedules.Where(x => 
                x.dayOfTheWeek == classScheduleToCheck.dayOfTheWeek &&
                x.startTime == classScheduleToCheck.startTime &&
                x.endTime == classScheduleToCheck.endTime &&
                x.type == classScheduleToCheck.type)
                .FirstOrDefault();

            if (classSchedule == null)
                return 0;
            else
                return classSchedule.idClassSchedule;
        }



    }
}

using Dtos;
using Entities;
using GroupLinkApi.Database;
using GroupLinkApi.Database.Repositories;
using GroupLinkApi.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupLinkApi.Services
{
    public class NotificationService : INotificationService
    {
        private readonly INotificationRepository _notificationRepository;
        protected readonly GroupLinkContext _context;

        public NotificationService(INotificationRepository notificationRepository, GroupLinkContext groupLinkContext)
        {
            _notificationRepository = notificationRepository;
            _context = groupLinkContext;
        }

        public List<ShortNotification> GetNotifications(int idCourse)
        {
            var res = (from notifications in _context.Notifications
                       join users in _context.Users on notifications.idUser equals users.idUser
                       where notifications.idCourse == idCourse
                       select new ShortNotification()
                       {
                            idNotification = notifications.idNotification,
                            title = notifications.title,
                            content = notifications.content,
                            login = users.login,
                            email = users.email
                       }).ToList();
            
            return res;
        }

        public List<ExtendedNotification> GetUserNotifications(int idUser)
        {
            var res = (from notifications in _context.Notifications
                       join courses in _context.Courses on notifications.idCourse equals courses.idCourse
                       join lecturers in _context.Lecturers on courses.idLecturer equals lecturers.idLecturer
                       join classSchedules in _context.ClassSchedules on courses.idClassSchedule equals classSchedules.idClassSchedule
                       where notifications.idUser == idUser 
                       select new ExtendedNotification
                       {
                           CourseName = courses.courseName,
                           CourseCode = courses.courseCode,
                           GroupCode = courses.groupCode,
                           Amount = notifications.amount,
                           DayOfTheWeek = classSchedules.dayOfTheWeek,
                           StartTime = classSchedules.startTime,
                           EndTime = classSchedules.endTime,
                           LecturerName = string.Format("{0} {1}", lecturers.name, lecturers.surname),
                           ScheduleType = classSchedules.type
                       }).ToList();

            return res;
        }

        public async Task<bool> Add(Notifications notification)
        {
            return await _notificationRepository.Add(notification);
        }

        public bool Update(Notifications notification)
        {
            return _notificationRepository.Update(notification);
        }

        public bool Delete(int idNotification)
        {
            return _notificationRepository.Delete(idNotification);
        }
    }
}

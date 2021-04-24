using Dtos;
using Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GroupLinkApi.Interfaces
{
    public interface INotificationService 
    {
        List<ShortNotification> GetNotifications(int idCourse);
        List<ExtendedNotification> GetUserNotifications(int idUser);
        Task<bool> Add(Notifications notification);
        bool Update(Notifications notification);
        bool Delete(int idNotification);
    }
}

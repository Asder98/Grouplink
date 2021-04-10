using Dtos;
using Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GroupLinkApi.Interfaces
{
    public interface INotificationService 
    {
        List<ProjectNotificationDto> GetNotifications();
        Task<bool> Add(Notifications notification);
        bool Update(Notifications notification);
        bool Delete(int idNotification);
    }
}

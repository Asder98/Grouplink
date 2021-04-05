using Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GroupLinkApi.Interfaces
{
    public interface INotificationService 
    {
        List<Notifications> GetNotifications(string type);
        Task<bool> Add(Notifications notification);
        bool Update(Notifications notification);
        bool Delete(int idNotification);
    }
}

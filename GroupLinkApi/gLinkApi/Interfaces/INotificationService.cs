using Entities;
using System.Collections.Generic;

namespace GroupLinkApi.Interfaces
{
    public interface INotificationService 
    {
        List<Notifications> GetNotifications(string type);
    }
}

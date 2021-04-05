using Entities;
using System.Collections.Generic;

namespace GroupLinkApi.Database.Repositories.NotificationRepository
{
    public interface INotificationRepository : IBasicRepository<Notifications>
    {
        List<Notifications> Get(string type);
    }
}

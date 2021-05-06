using Entities;
using System.Collections.Generic;

namespace GroupLinkApi.Database.Repositories
{
    public interface INotificationRepository : IBasicRepository<Notifications>
    {
        List<Notifications> Get(string type);
        bool Delete(int idNotification);
    }
}

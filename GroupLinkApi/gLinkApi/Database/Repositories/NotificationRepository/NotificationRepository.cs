using Entities;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;

namespace GroupLinkApi.Database.Repositories.NotificationRepository
{
    public class NotificationRepository : BasicRepository<Notifications>, INotificationRepository 
    {
        public NotificationRepository(GroupLinkContext context, ILogger<BasicRepository<Notifications>> logger) : base(context, logger) { }

        public List<Notifications> Get(string type) 
        {
            return _context.Notifications
                            .Where(x => x.type == type)
                            .ToList();
        }
    }
}

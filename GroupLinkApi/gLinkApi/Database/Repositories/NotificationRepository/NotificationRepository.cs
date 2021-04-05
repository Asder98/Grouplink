using Entities;
using Microsoft.Extensions.Logging;
using System;
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

        public bool Delete(int idNotification)
        {
            if (DatabaseCorrectness().Result)
            {
                try
                {
                    _context.Notifications.Remove(_context.Notifications.Find(idNotification));
                    if (TrySaveChangesAsync().Result)
                        return true;
                    else
                        return false;
                }
                catch (Exception e)
                {
                    _logger.LogError(e.Message);
                    return false;
                }
            }
            return false;
        }
    }
}

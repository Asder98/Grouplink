using Entities;
using GroupLinkApi.Database.Repositories.NotificationRepository;
using GroupLinkApi.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GroupLinkApi.Services
{
    public class NotificationService : INotificationService
    {
        private readonly INotificationRepository _notificationRepository;

        public NotificationService(INotificationRepository notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }

        public List<Notifications> GetNotifications(string type)
        {
            return _notificationRepository.Get(type);
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

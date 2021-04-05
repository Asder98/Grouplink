using Entities;
using GroupLinkApi.Database.Repositories.NotificationRepository;
using GroupLinkApi.Interfaces;
using System.Collections.Generic;

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
    }
}

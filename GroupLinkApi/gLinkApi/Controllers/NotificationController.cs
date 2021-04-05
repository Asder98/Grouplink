using Entities;
using GroupLinkApi.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace GroupLinkApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _notificationService;
        public NotificationController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        [HttpGet("{type}")]
        public List<Notifications> GetNotifications(string type)
        {
            return _notificationService.GetNotifications(type);
        }

        
    }
}

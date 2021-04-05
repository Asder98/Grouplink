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

        [HttpPost]
        public IActionResult Add(Notifications notification)
        {
            var result = _notificationService.Add(notification);
            if (result.Result)
                return Ok(notification);
            else
                return StatusCode(500);
        }

        [HttpPut]
        public IActionResult Update(Notifications notification)
        {
            var result = _notificationService.Update(notification);
            if (result)
                return Ok(notification);
            else
                return StatusCode(500);
        }

        [HttpDelete("{idNotification}")]
        public IActionResult Delete(int idNotification)
        {
            var result = _notificationService.Delete(idNotification);
            if (result)
                return Ok();
            else
                return StatusCode(500);
        }
    }
}

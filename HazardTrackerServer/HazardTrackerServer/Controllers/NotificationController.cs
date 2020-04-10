using DAL.Entities;
using DAL.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace HazardTrackerServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationRepository _notificationRepository;
        private readonly IUserRepository _userRepository;

        public NotificationController(INotificationRepository notificatonRepository, IUserRepository userRepository)
        {
            _notificationRepository = notificatonRepository;
            _userRepository = userRepository;
        }

        [HttpGet("getAllNotificationsForUser/{imei}")]
        public ActionResult<IEnumerable<NotificationEntity>> GetAllNotificationsForUser(string imei)
        {
            UserEntity user = _userRepository.GetByImei(imei);
            return _notificationRepository.GetAllNotificationsForUser(user.Id).ToList();
        }
    }
}
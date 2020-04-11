using System;
using System.Collections.Generic;
using DAL.Entities;

namespace DAL.Repositories.Interfaces
{
    public interface INotificationRepository : IEntityRepository<NotificationEntity>
    {
        IEnumerable<NotificationEntity> GetAllNotificationsForUser(string imei);
    }
}

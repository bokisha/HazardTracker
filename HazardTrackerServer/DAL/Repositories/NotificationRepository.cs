using System.Collections.Generic;
using System.Linq;
using DAL.Entities;
using DAL.Repositories.Interfaces;

namespace DAL.Repositories
{
    public class NotificationRepository : EntityRepository<NotificationEntity>, INotificationRepository
    {
        public NotificationRepository(HazardTrackerDbContext dbContext) : base(dbContext)
        {
        }

        public IEnumerable<NotificationEntity> GetAllNotificationsForUser(string imei)
        {
            IQueryable<NotificationEntity> notificationsForUser = DbSet.Where(v => v.User.Imei == imei);
            return notificationsForUser.ToList();
        }
    }
}
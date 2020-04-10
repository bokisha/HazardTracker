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

        public IEnumerable<NotificationEntity> GetAllNotificationsForUser(int userId)
        {
            IQueryable<NotificationEntity> notificationsForUser = DbSet.Where(v => v.User.Id == userId);
            return notificationsForUser.ToList();
        }
    }
}
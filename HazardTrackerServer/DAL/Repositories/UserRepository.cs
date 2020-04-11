using System.Linq;

using DAL.Entities;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class UserRepository : EntityRepository<UserEntity>, IUserRepository
    {
        public UserRepository(HazardTrackerDbContext dbContext) : base(dbContext)
        {
        }

        public UserEntity GetByImei(string imei)
        {
            return DbSet.Include(u => u.Notifications).FirstOrDefault(item => item.Imei == imei);
        }
    }
}

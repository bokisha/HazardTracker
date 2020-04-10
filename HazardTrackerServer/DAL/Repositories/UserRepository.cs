using System.Linq;

using DAL.Entities;
using DAL.Repositories.Interfaces;

namespace DAL.Repositories
{
    public class UserRepository : EntityRepository<UserEntity>, IUserRepository
    {
        public UserRepository(HazardTrackerDbContext dbContext) : base(dbContext)
        {
        }

        public UserEntity GetByImei(string imei)
        {
            return DbSet.AsEnumerable().FirstOrDefault(item => item.Imei == imei);
        }
    }
}

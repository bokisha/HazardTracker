using DAL.Entities;
using DAL.Repositories.Interfaces;

namespace DAL.Repositories
{
    public class UserInfoRepository : EntityRepository<UserInfoEntity>, IUserInfoRepository
    {
        public UserInfoRepository(HazardTrackerDbContext dbContext) : base(dbContext)
        {
        }
    }
}

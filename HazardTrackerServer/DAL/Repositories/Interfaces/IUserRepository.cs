using DAL.Entities;

namespace DAL.Repositories.Interfaces
{
    public interface IUserRepository : IEntityRepository<UserEntity>
    {
        public UserEntity GetByImei(string imei);
    }
}

using DAL.Entities;
using DAL.Repositories.Interfaces;

namespace DAL.Repositories
{
    public class LocationRepository : EntityRepository<LocationEntity>, ILocationRepository
    {
        public LocationRepository(HazardTrackerDbContext dbContext) : base(dbContext)
        {
        }
    }
}

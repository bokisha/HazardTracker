using System.Collections.Generic;
using System.Linq;

using DAL.Entities;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class LocationRepository : EntityRepository<LocationEntity>, ILocationRepository
    {
        public LocationRepository(HazardTrackerDbContext dbContext) : base(dbContext)
        {
        }

        public IList<LocationEntity> GetAllLocations()
        {
            return DbSet.Include(l => l.Visitations).ToList();
        }

        public LocationEntity GetLocationById(int id)
        {
            return DbSet.Include(l => l.Visitations).FirstOrDefault(l => l.Id == id);
        }
    }
}

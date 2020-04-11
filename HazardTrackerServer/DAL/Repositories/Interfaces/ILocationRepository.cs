using System.Collections.Generic;
using DAL.Entities;

namespace DAL.Repositories.Interfaces
{
    public interface ILocationRepository : IEntityRepository<LocationEntity>
    {
        public IList<LocationEntity> GetAllLocations();
        public LocationEntity GetLocationById(int id);
    }
}

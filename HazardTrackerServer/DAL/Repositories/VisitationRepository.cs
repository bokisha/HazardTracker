using System.Collections.Generic;
using System.Linq;
using DAL.Entities;
using DAL.Repositories.Interfaces;

namespace DAL.Repositories
{
    public class VisitationRepository : EntityRepository<VisitationEntity>, IVisitationRepository
    {
        public VisitationRepository(HazardTrackerDbContext dbContext) : base(dbContext)
        {
        }

        public IEnumerable<VisitationEntity> GetAllVisitationsForImei(string Imei)
        {
            IQueryable<VisitationEntity> visitationsForImei = DbSet.Where(v => v.Imei == Imei);
            return visitationsForImei.ToList();
        }

        public IEnumerable<VisitationEntity> GetAllVisitationsForLocation(int locationId)
        {
            IQueryable<VisitationEntity> visitationsForLocation = DbSet.Where(v => v.Location.Id == locationId);
            return visitationsForLocation.ToList();
        }

        public VisitationEntity GetLatestVisitation(string imei, int locationId)
        {
            return DbSet.Where(v => v.Imei == imei && v.Location.Id == locationId)
                        .OrderByDescending(v => v.EnterTime).First();
        }
    }
}
using DAL.Entities;
using DAL.Repositories.Interfaces;

namespace DAL.Repositories
{
    public class VisitationRepository : EntityRepository<VisitationEntity>, IVisitationRepository
    {
        public VisitationRepository(HazardTrackerDbContext dbContext) : base(dbContext)
        {
        }
    }
}

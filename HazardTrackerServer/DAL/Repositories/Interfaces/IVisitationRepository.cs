using System;
using System.Collections.Generic;
using DAL.Entities;

namespace DAL.Repositories.Interfaces
{
    public interface IVisitationRepository : IEntityRepository<VisitationEntity>
    {
        IEnumerable<VisitationEntity> GetAllVisitationsForImei(string imei);
        IEnumerable<VisitationEntity> GetAllVisitationsForLocation(int locationId);
        VisitationEntity GetLastestVisitation(string imei, int locationId);
    }
}

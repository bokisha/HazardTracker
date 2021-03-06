﻿using System.Collections.Generic;
using System.Linq;
using DAL.Entities;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class VisitationRepository : EntityRepository<VisitationEntity>, IVisitationRepository
    {
        public VisitationRepository(HazardTrackerDbContext dbContext) : base(dbContext)
        {
        }

        public IEnumerable<VisitationEntity> GetAllVisitationsForImei(string Imei)
        {
            IQueryable<VisitationEntity> visitationsForImei = DbSet
                .Include(v => v.Location)
                .Where(v => v.Imei == Imei);
            return visitationsForImei.OrderByDescending(item => item.EnterTime).ToList();
        }

        public IEnumerable<VisitationEntity> GetAllVisitationsForLocation(int locationId)
        {
            IQueryable<VisitationEntity> visitationsForLocation = DbSet
                .Include(v => v.Location)
                .Where(v => v.Location.Id == locationId);
            return visitationsForLocation.ToList();
        }

        public VisitationEntity GetLatestVisitation(string imei, int locationId)
        {
            return DbSet.Include(v => v.Location)
                .Where(v => v.Imei == imei && v.Location.Id == locationId)
                        .OrderByDescending(v => v.EnterTime).First();
        }

        public VisitationEntity GetVisitationById(int id)
        {
            return DbSet.Include(v => v.Location).FirstOrDefault(v => v.Id == id);
        }
    }
}
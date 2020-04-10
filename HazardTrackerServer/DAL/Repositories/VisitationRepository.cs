﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public IEnumerable<VisitationEntity> GetAll()
        {
            return DbSet.AsEnumerable();
        }

        public async Task<List<VisitationEntity>> GetAllAsync()
        {
            return await DbSet.ToListAsync();
        }

        public void Create(VisitationEntity entity)
        {
            DbSet.Add(entity);
            DbContext.SaveChanges();
        }

        public IEnumerable<VisitationEntity> GetAllVisitationsForImei(string Imei)
        {
            IQueryable<VisitationEntity> visitationsForImei = DbSet.Where(v => v.Imei == Imei);
            return visitationsForImei.ToList();
        }

        public VisitationEntity GetById(int id)
        {
            return DbSet.Find(id);
        }
    }
}

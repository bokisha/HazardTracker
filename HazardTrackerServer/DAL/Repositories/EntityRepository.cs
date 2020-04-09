using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Entities.Interfaces;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DAL.Repositories
{
    public class EntityRepository<T> : IEntityRepository<T> where T : class, IEntity
    {
        protected readonly HazardTrackerDbContext DbContext;
        protected readonly DbSet<T> DbSet;

        public EntityRepository(HazardTrackerDbContext dbContext)
        {
            DbContext = dbContext;
            DbSet = DbContext.Set<T>();
        }

        public IEnumerable<T> GetAll()
        {
            return DbSet.AsEnumerable<T>();
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await DbSet.ToListAsync();
        }

        public void Create(T entity)
        {
            DbSet.Add(entity);
            DbContext.SaveChanges();
        }

        public void Delete(T entity)
        {
            DbSet.Remove(entity);
            DbContext.SaveChanges();
        }

        public void Update(T entity)
        {
            DbSet.Update(entity);
            DbContext.SaveChanges();
        }
    }
}

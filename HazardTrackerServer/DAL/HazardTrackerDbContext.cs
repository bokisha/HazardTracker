using DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class HazardTrackerDbContext : DbContext
    {
        public HazardTrackerDbContext(DbContextOptions options)
            : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserEntity>(entity => { entity.HasKey(e => e.Id); });
            modelBuilder.Entity<LocationEntity>(entity => { entity.HasKey(e => e.Id); });
            modelBuilder.Entity<VisitationEntity>(entity => { entity.HasKey(e => e.Id);});
        }
    }
}

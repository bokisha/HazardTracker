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

            modelBuilder.Entity<UserEntity>(entity =>
            { 
                entity.HasKey(e => e.Id);
                entity.HasMany(u => u.Notifications).WithOne(v => v.User);
            });
            modelBuilder.Entity<LocationEntity>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasMany(l => l.Visitations).WithOne(v => v.Location);
            });
            modelBuilder.Entity<VisitationEntity>(entity => { entity.HasKey(e => e.Id);});
            modelBuilder.Entity<NotificationEntity>(entity => { entity.HasKey(e => e.Id); });
        }
    }
}

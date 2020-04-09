using DAL.Entities;
using DAL.Repositories.Interfaces;

namespace DAL
{
    public class DatabaseSeeder : IDatabaseSeeder
    {
        private readonly HazardTrackerDbContext _hazardTrackerDbContext;
        private readonly IUserRepository _userRepository;
        private readonly ILocationRepository _locationRepository;
        private readonly IVisitationRepository _visitationRepository;

        public DatabaseSeeder(HazardTrackerDbContext hazardTrackerDbContext, IUserRepository userRepository,
            ILocationRepository locationRepository, IVisitationRepository visitationRepository)
        {
            _hazardTrackerDbContext = hazardTrackerDbContext;
            _locationRepository = locationRepository;
            _visitationRepository = visitationRepository;
            _userRepository = userRepository;
        }

        public void Seed()
        {
            _hazardTrackerDbContext.Database.EnsureDeleted();
            _hazardTrackerDbContext.Database.EnsureCreated();

            var user = new UserEntity {Imei = "ooooo", IsInfected = false};
            _userRepository.Create(user);

            var location1 = new LocationEntity {Name = "Maxi", Address = "Ulica1", Latitude = 0, Longitude = 0};
            _locationRepository.Create(location1);

            var location2 = new LocationEntity { Name = "Tempo", Address = "Ulica2", Latitude = 0, Longitude = 0 };
            _locationRepository.Create(location2);

            var visitation1 = new VisitationEntity {Imei = "ooooo", LocationId = location1.Id};
            _visitationRepository.Create(visitation1);

            var visitation2 = new VisitationEntity { Imei = "lllll", LocationId = location2.Id };
            _visitationRepository.Create(visitation2);
        }
    }
}

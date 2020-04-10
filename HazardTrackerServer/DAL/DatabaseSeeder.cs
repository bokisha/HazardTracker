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

            var user1 = new UserEntity { Imei = "ooooo", IsInfected = false };
            _userRepository.Create(user1);

            var user2 = new UserEntity { Imei = "lllll", IsInfected = false };
            _userRepository.Create(user2);

            var location1 = new LocationEntity { Name = "Maxi", Address = "Džona Kenedija 10, Beograd 11080, Serbia", Latitude = 132462513, Longitude = 456758652 };
            _locationRepository.Create(location1);

            var location2 = new LocationEntity { Name = "Tempo", Address = "Bulevar Mihajla Pupina 181v, Novi Beograd 11070, Serbia", Latitude = 21324562132, Longitude = 456756514 };
            _locationRepository.Create(location2);

            var location3 = new LocationEntity { Name = "Maxi", Address = "Narodnih heroja 30, Beograd 11070, Serbia", Latitude = 21324562132, Longitude = 456756513 };
            _locationRepository.Create(location3);

            var location4 = new LocationEntity { Name = "Idea", Address = "Bulevar Mihajla Pupina 181v, Novi Beograd 11070, Serbia", Latitude = 21324562132, Longitude = 456756513 };
            _locationRepository.Create(location4);

            var visitation1 = new VisitationEntity { Imei = "ooooo", Location = location1 };
            _visitationRepository.Create(visitation1);

            var visitation2 = new VisitationEntity { Imei = "lllll", Location = location2 };
            _visitationRepository.Create(visitation2);
        }
    }
}

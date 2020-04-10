using System;
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
        private readonly INotificationRepository _notificationRepository;

        public DatabaseSeeder(HazardTrackerDbContext hazardTrackerDbContext, IUserRepository userRepository,
            ILocationRepository locationRepository, IVisitationRepository visitationRepository, INotificationRepository notificationRepository)
        {
            _hazardTrackerDbContext = hazardTrackerDbContext;
            _locationRepository = locationRepository;
            _visitationRepository = visitationRepository;
            _userRepository = userRepository;
            _notificationRepository = notificationRepository;
        }

        public void Seed()
        {
            _hazardTrackerDbContext.Database.EnsureDeleted();
            _hazardTrackerDbContext.Database.EnsureCreated();

            var user1 = new UserEntity { Imei = "ooooo", IsInfected = false };
            _userRepository.Create(user1);

            var user2 = new UserEntity { Imei = "lllll", IsInfected = false };
            _userRepository.Create(user2);

            var user3 = new UserEntity { Imei = "wwwww", IsInfected = true, PotentialInfectionDate = new DateTime(2020, 4, 1)};
            _userRepository.Create(user3);

            var user4 = new UserEntity { Imei = "rrrrr", IsInfected = false};
            _userRepository.Create(user4);

            var location1 = new LocationEntity { Name = "Maxi", Address = "Džona Kenedija 10, Beograd 11080, Serbia", Latitude = 132462513, Longitude = 456758652 };
            _locationRepository.Create(location1);

            var location2 = new LocationEntity { Name = "Tempo", Address = "Bulevar Mihajla Pupina 181v, Novi Beograd 11070, Serbia", Latitude = 21324562132, Longitude = 456756514 };
            _locationRepository.Create(location2);

            var location3 = new LocationEntity { Name = "Maxi", Address = "Narodnih heroja 30, Beograd 11070, Serbia", Latitude = 21324562132, Longitude = 456756513 };
            _locationRepository.Create(location3);

            var location4 = new LocationEntity { Name = "Idea", Address = "Bulevar Mihajla Pupina 182, Novi Beograd 11070, Serbia", Latitude = 21324562132, Longitude = 456756513 };
            _locationRepository.Create(location4);

            var visitation3 = new VisitationEntity { Imei = "wwwww", Location = location3, EnterTime = new DateTime(2020, 4, 1, 10, 0, 0), ExitTime = new DateTime(2020, 4, 1, 12, 0, 0) };
            var visitation4 = new VisitationEntity { Imei = "wwwww", Location = location3, EnterTime = new DateTime(2020, 4, 2, 9, 0, 0), ExitTime = new DateTime(2020, 4, 2, 10, 0, 0) };
            var visitation5 = new VisitationEntity { Imei = "wwwww", Location = location3, EnterTime = new DateTime(2020, 4, 4, 11, 0, 0), ExitTime = new DateTime(2020, 4, 4, 13, 0, 0) };
            var visitation6 = new VisitationEntity { Imei = "wwwww", Location = location4, EnterTime = new DateTime(2020, 4, 6, 8, 0, 0), ExitTime = new DateTime(2020, 4, 6, 10, 0, 0) };
            _visitationRepository.Create(visitation3);
            _visitationRepository.Create(visitation4);
            _visitationRepository.Create(visitation5);
            _visitationRepository.Create(visitation6);

            var visitation7 = new VisitationEntity { Imei = "rrrrr", Location = location3, EnterTime = new DateTime(2020, 4, 2, 9, 30, 0), ExitTime = new DateTime(2020, 4, 2, 12, 0, 0) };
            var visitation8 = new VisitationEntity { Imei = "lllll", Location = location3, EnterTime = new DateTime(2020, 4, 2, 11, 0, 0), ExitTime = new DateTime(2020, 4, 2, 12, 0, 0) };
            _visitationRepository.Create(visitation7);
            _visitationRepository.Create(visitation8);

            var notification1 = new NotificationEntity { NotificationText = "notificationText1", User = user1 };
            _notificationRepository.Create(notification1);

            var notification2 = new NotificationEntity { NotificationText = "notificationText2", User = user2 };
            _notificationRepository.Create(notification2);
        }
    }
}

using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using DAL.Entities;
using DAL.Repositories.Interfaces;
using CorePush.Google;
using System.Linq;
using System;
using Newtonsoft.Json;

namespace HazardTrackerServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserInfoController : ControllerBase
    {
        private readonly IUserRepository _userInfoRepository;
        private readonly ILocationRepository _locationRepository;
        const string ServerKey = "AAAABFh1LNw:APA91bHt0mDiIE7GPYcpy802Pn1HTZ8kvsK2DY0GxyGOEj-MnfVaaLRDaZ4d9kYbB6dN-vjDxgQHieLu7MA8N-hZ10KMYCLyRA2tNxYU-IA4nt9l898VUAIQOsLw0POHaoXqN4XCfI6A";
        const string SenderId = "18663943388";

        public UserInfoController(IUserRepository userInfoRepository, ILocationRepository locationRepository)
        {
            _userInfoRepository = userInfoRepository;
            _locationRepository = locationRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            IList<UserEntity> userInfo = await _userInfoRepository.GetAllAsync();

            // add dtos and mappings between dtos and entities
            return Ok(userInfo);
        }

        [HttpGet("{imei}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<UserEntity> Get(string imei)
        {
            var user = _userInfoRepository.GetByImei(imei);

            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [HttpGet("getById/{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<LocationEntity> GetById(int id)
        {
            var user = _userInfoRepository.GetById(id);

            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPut("token")]
        public IActionResult PutToken(UserEntity user)
        {
            _userInfoRepository.Update(user);
            return Ok();
        }

        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPut]
        public IActionResult Put(UserEntity user)
        {
            CheckUsersExposure(user);
            _userInfoRepository.Update(user);

            return Ok();
        }

        [HttpPost]
        public IActionResult Post([FromBody] UserEntity user)
        {
            try {
                _userInfoRepository.Create(user);
            }
            catch (InvalidOperationException e)
            {
                Console.WriteLine(e);
                throw new InvalidOperationException($"Could not create a user record. {e.Message}");
            }

            return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
        }

        private void CheckUsersExposure(UserEntity user)
        {
            IEnumerable<LocationEntity> locations = _locationRepository.GetAll();
            IList<UserEntity> exposedUsers = new List<UserEntity>();

            foreach (LocationEntity location in locations)
            {
                // for now just compare the dates
                if (location.Visitations.Any(v => v.Imei == user.Imei && v.EnterTime.Date >= user.PotentialInfectionDate.Date && v.EnterTime.Date <= DateTime.Now.Date))
                {
                    foreach (VisitationEntity visitation in location.Visitations.Where(v => v.Imei != user.Imei))
                    {
                        // this can be optimized later
                        UserEntity exposedUser = _userInfoRepository.GetByImei(visitation.Imei);
                        exposedUsers.Add(exposedUser);
                    }
                }
            }

            NotifyUsers(exposedUsers);
        }

        private async void NotifyUsers(IEnumerable<UserEntity> users)
        {
            using (var fcm = new FcmSender(ServerKey, SenderId))
            {
                var notification = new GoogleNotification
                {
                    Data = new GoogleNotification.DataPayload
                    {
                        Message = $"You have been hazarded! {DateTime.Now}"
                    }
                };

                foreach (var user in users)
                {
                    await fcm.SendAsync(user.DeviceToken, notification);
                }
            }
        }
    }

    public class GoogleNotification
    {
        public class DataPayload
        {
            // Add your custom properties as needed
            [JsonProperty("message")]
            public string Message { get; set; }
        }
        [JsonProperty("priority")]
        public string Priority { get; set; } = "high";
        [JsonProperty("data")]
        public DataPayload Data { get; set; }
    }
}

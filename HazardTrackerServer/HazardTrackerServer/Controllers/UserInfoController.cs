using System.Collections.Generic;
using System.Threading.Tasks;
using DAL.Entities;
using DAL.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HazardTrackerServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserInfoController : ControllerBase
    {
        private readonly IUserInfoRepository _userInfoRepository;

        public UserInfoController(IUserInfoRepository userInfoRepository)
        {
            _userInfoRepository = userInfoRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            IList<UserInfoEntity> userInfo = await _userInfoRepository.GetAllAsync();

            // add dtos and mappings between dtos and entities
            return Ok(userInfo);
        }
    }
}

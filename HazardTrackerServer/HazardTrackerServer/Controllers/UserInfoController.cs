using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using DAL.Entities;
using DAL.Repositories.Interfaces;

namespace HazardTrackerServer.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserInfoController : ControllerBase
    {
        private readonly IUserRepository _userInfoRepository;

        public UserInfoController(IUserRepository userInfoRepository)
        {
            _userInfoRepository = userInfoRepository;
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

        //[HttpGet("{id}")]
        //[ProducesResponseType(StatusCodes.Status404NotFound)]
        //public ActionResult<LocationEntity> GetById(int id)
        //{
        //    var user = _userInfoRepository.GetById(id);

        //    if (user == null)
        //        return NotFound();

        //    return Ok(user);
        //}

        [ProducesResponseType(StatusCodes.Status202Accepted)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPut]
        public IActionResult Put(UserEntity user)
        {
            _userInfoRepository.Update(user);

            return Ok();
        }
    }
}

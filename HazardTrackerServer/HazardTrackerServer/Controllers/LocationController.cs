using DAL.Entities;
using HazardTrackerServer.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DAL.Repositories.Interfaces;

namespace HazardTrackerServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly ILocationRepository _locationRepository;

        public LocationController(ILocationRepository locationRepository)
        {
            _locationRepository = locationRepository;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<LocationEntity> GetById(int id)
        {
            var location = _locationRepository.GetById(id);

            if (location == null)
            {
                return NotFound();
            }

            return location;
        }

        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [HttpPost]
        public IActionResult Post([FromBody]LocationDto locationDto)
        {
            var location = new LocationEntity
            {
                Name = locationDto.Name,
                Address = locationDto.Address
            };
            _locationRepository.Create(location);

            return CreatedAtAction(nameof(GetById), new { id = location.Id }, location);
        }
    }
}
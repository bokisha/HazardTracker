using System;
using System.Collections.Generic;
using System.Linq;
using DAL.Entities;
using DAL.Repositories.Interfaces;
using HazardTrackerServer.Dtos;
using Microsoft.AspNetCore.Mvc;
using InvalidOperationException = System.InvalidOperationException;

namespace HazardTrackerServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VisitationController : ControllerBase
    {
        private readonly IVisitationRepository _visitationRepository;
        private readonly ILocationRepository _locationRepository;

        public VisitationController(IVisitationRepository visitationRepository, ILocationRepository locationRepository)
        {
            _visitationRepository = visitationRepository;
            _locationRepository = locationRepository;
        }

        [HttpGet("getAllVisitationsForImei/{imei}")]
        public ActionResult<IEnumerable<VisitationEntity>> GetAllVisitationsForImei(string imei)
        {
            return _visitationRepository.GetAllVisitationsForImei(imei).ToList();
        }

        [HttpGet("getAllVisitationsForLocation/{locationId}")]
        public ActionResult<IEnumerable<VisitationEntity>> GetAllVisitationsForLocation(int locationId)
        {
            return _visitationRepository.GetAllVisitationsForLocation(locationId).ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<VisitationEntity> GetById(int id)
        {
            var visitationEntity = _visitationRepository.GetById(id);

            if (visitationEntity == null)
            {
                return NotFound();
            }

            return visitationEntity;
        }

       
        [HttpPost]
        public IActionResult Post([FromBody]VisitationDto visitationDto)
        {
            try
            {
                LocationEntity location = _locationRepository.GetById(visitationDto.LocationId);

                try
                {
                    var visitation = new VisitationEntity
                    {
                        Id = visitationDto.Id,
                        Imei = visitationDto.Imei,
                        EnterTime = visitationDto.EnterTime,
                        ExitTime = visitationDto.ExitTime,
                        Location = location
                    };
                    _visitationRepository.Create(visitation);

                    return CreatedAtAction(nameof(GetById), new { id = visitation.Id }, visitation);

                }
                catch (InvalidOperationException e)
                {
                    Console.WriteLine(e);
                    throw new InvalidOperationException($"Could not create a visitation record. {e.Message}");
                }
            }
            catch (InvalidOperationException e)
            {
                throw new InvalidOperationException($"QR code provided a location with invalid ID. {e.Message}");
            }
        }
    }
}

﻿using System;
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

        [HttpGet("getLatestVisitation")]
        public ActionResult<VisitationEntity> GetLatestVisitation(string imei, int locationId)
        {
            return _visitationRepository.GetLatestVisitation(imei, locationId);
        }

        [HttpGet("{id}")]
        public ActionResult<VisitationEntity> GetById(int id)
        {
            var visitationEntity = _visitationRepository.GetVisitationById(id);

            if (visitationEntity == null)
            {
                return NotFound();
            }

            return visitationEntity;
        }

        [HttpPost("addVisitation")]
        public IActionResult Post([FromBody] VisitationDto visitationDto)
        {
            LocationEntity location = _locationRepository.GetLocationById(visitationDto.LocationId);
            if (location == null) return BadRequest("Invalid location id.");

            CreateVisitation(visitationDto.Imei, location);

            return CreatedAtAction(nameof(GetById), new { id = location.Id }, location);
        }

        [HttpPut("updateVisitation")]
        public IActionResult Put([FromBody] VisitationDto visitationDto)
        {
            VisitationEntity visitedAndCurrentLocation = _visitationRepository.GetLatestVisitation(visitationDto.Imei, visitationDto.LocationId);

            visitedAndCurrentLocation.ExitTime = DateTime.Now;
            _visitationRepository.Update(visitedAndCurrentLocation);
            return Ok();
        }

        private void CreateVisitation(string imei, LocationEntity location)
        {
            try
            {
                var visitation = new VisitationEntity
                {
                    Imei = imei,
                    EnterTime = DateTime.Now,
                    ExitTime = DateTime.Today.AddDays(1),
                    Location = location
                };
                _visitationRepository.Create(visitation);
            }
            catch (InvalidOperationException e)
            {
                Console.WriteLine(e);
                throw new InvalidOperationException($"Could not create a visitation record. {e.Message}");
            }
        }
    }
}
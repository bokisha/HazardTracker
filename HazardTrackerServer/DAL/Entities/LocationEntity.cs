using System.Collections.Generic;
using DAL.Entities.Interfaces;

namespace DAL.Entities
{
    public class LocationEntity : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        public ICollection<VisitationEntity> Visitations { get; set; }
    }
}

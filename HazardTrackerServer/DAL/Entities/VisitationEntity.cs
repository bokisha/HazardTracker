using System;
using DAL.Entities.Interfaces;

namespace DAL.Entities
{
    public class VisitationEntity : IEntity
    {
        public int Id { get; set; }
        public string Imei { get; set; }
        public DateTime EnterTime { get; set; }
        public DateTime ExitTime { get; set; }
        public LocationEntity Location { get; set; }
    }
}

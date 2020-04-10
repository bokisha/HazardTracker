using System;

namespace HazardTrackerServer.Dtos
{
    public class VisitationDto
    {
        public int Id { get; set; }
        public string Imei { get; set; }
        public DateTime EnterTime { get; set; }
        public DateTime ExitTime { get; set; }
        public int LocationId { get; set; }
    }
}
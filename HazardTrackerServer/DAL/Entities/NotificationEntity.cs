using System.Collections.Generic;
using DAL.Entities.Interfaces;

namespace DAL.Entities
{
    public class NotificationEntity : IEntity
    {
        public int Id { get; set; }
        public string NotificationText { get; set; }
        public UserEntity User { get; set; }
    }
}

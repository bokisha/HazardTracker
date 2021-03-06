﻿using System;
using System.Collections.Generic;
using DAL.Entities.Interfaces;

namespace DAL.Entities
{
    public class UserEntity : IEntity
    {
        public int Id { get; set; }
        public string Imei { get; set; }
        public string DeviceToken { get; set; }
        public bool IsInfected { get; set; }
        public DateTime PotentialInfectionDate { get; set; }
        public ICollection<NotificationEntity> Notifications { get; set; }
    }
}

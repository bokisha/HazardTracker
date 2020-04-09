using DAL.Entities.Interfaces;

namespace DAL.Entities
{
    public class UserEntity : IEntity
    {
        public int Id { get; set; }
        public string Imei { get; set; }
        public bool IsInfected { get; set; }
    }
}

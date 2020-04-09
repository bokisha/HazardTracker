using DAL.Entities.Interfaces;

namespace DAL.Entities
{
    // initial entity, rename if needed
    public class UserInfoEntity : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        // add other properties
    }
}

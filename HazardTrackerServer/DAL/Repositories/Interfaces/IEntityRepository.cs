using System.Collections.Generic;
using System.Threading.Tasks;
using DAL.Entities.Interfaces;

namespace DAL.Repositories.Interfaces
{
    public interface IEntityRepository<T> where T : IEntity
    {
        IEnumerable<T> GetAll();
        Task<List<T>> GetAllAsync();
        void Create(T entity);
        void Update(T entity);
        void Delete(T entity);
    }
}

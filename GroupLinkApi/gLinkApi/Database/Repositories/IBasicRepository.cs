using System.Threading.Tasks;

namespace GroupLinkApi.Database.Repositories
{
    public interface IBasicRepository<T>
    {
        Task<bool> DatabaseCorrectness();
        Task<bool> Add(T entity);
        Task<bool> TrySaveChangesAsync();
        bool Update(T entity);
    }
}

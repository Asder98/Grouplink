using Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GroupLinkApi.Database.Repositories.UserRepository
{
    public interface IUserRepository : IBasicRepository<Users>
    {
        Task<List<Users>> GetUsers();
    }
}

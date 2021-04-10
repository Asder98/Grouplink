using Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GroupLinkApi.Database.Repositories
{
    public interface IUserRepository : IBasicRepository<Users>
    {
        Task<List<Users>> GetUsers();
        Users GetUser(string login, string password);
        Users GetUser(int idUser);
        bool CheckFreePassword(string password);
        bool CheckFreeLogin(string login);
    }
}

using Entities;
using Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GroupLinkApi.Interfaces
{
    public interface IUserService
    {
        Task<List<Users>> GetUsers();
        AuthenticateResponse Authenticate(AuthenticateRequest model);
        bool AddUser(RegisterModel registerModel);
        bool CheckFreePassword(string password);
        bool CheckFreeLogin(string login);
        Users GetById(int idUser);
    }
}

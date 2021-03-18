using Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GroupLinkApi.Interfaces
{
    public interface IUserService
    {
        Task<List<Users>> GetUsers();
    }
}

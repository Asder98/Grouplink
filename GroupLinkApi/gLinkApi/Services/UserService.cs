using Entities;
using GroupLinkApi.Database.Repositories.UserRepository;
using GroupLinkApi.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GroupLinkApi.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<List<Users>> GetUsers()
        {
            return await _userRepository.GetUsers();
        }
    }
}

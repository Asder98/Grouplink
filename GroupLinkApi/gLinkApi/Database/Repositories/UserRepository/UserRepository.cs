using Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupLinkApi.Database.Repositories.UserRepository
{
    public class UserRepository : BasicRepository<Users>, IUserRepository
    {
        public UserRepository(GroupLinkContext context, ILogger<BasicRepository<Users>> logger) : base(context, logger) { }

        public async Task<List<Users>> GetUsers() 
        {
            List<Users> users = new List<Users>();
            if (DatabaseCorrectness().Result)
            {
                users = await _context.Users.ToListAsync();
            }
            return users;
        }
    }
}

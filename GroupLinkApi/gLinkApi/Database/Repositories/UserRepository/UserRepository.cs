using Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupLinkApi.Database.Repositories
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

        public Users GetUser(int idUser)
        {
            Users user = new Users();
            if (DatabaseCorrectness().Result)
            {
                user = _context.Users.Where(x => x.idUser == idUser).FirstOrDefault();
            }
            return user;
        }
        public Users GetUser(string login, string password)
        {
            Users user = new Users();
            if (DatabaseCorrectness().Result)
            {
                user = _context.Users.Where(x => x.login == login && x.password == password).FirstOrDefault();                
            }
            return user;
        }
        public bool CheckFreePassword(string password)
        {
            var user = _context.Users.SingleOrDefault(x => x.password == password);

            if (user == null)
                return false;
            else
                return true;
        }
        public bool CheckFreeLogin(string login)
        {
            var user = _context.Users.SingleOrDefault(x => x.login == login);

            if (user == null)
                return false;
            else
                return true;
        }


    }
}

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

        public int GetUserId(string login)
        {
            Users user = new Users();
            if (DatabaseCorrectness().Result)
            {
                user = _context.Users.Where(x => x.login == login).FirstOrDefault();
            }

            if (user == null)
                return 0;
            else
                return user.idUser;
        }


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
            var user = _context.Users.Where(x => x.password == password).FirstOrDefault();

            if (user == null)
                return false;
            else
                return true;
        }
        public bool CheckFreeLogin(string login)
        {
            var user = _context.Users.Where(x => x.login == login).FirstOrDefault();

            if (user == null)
                return false;
            else
                return true;
        }


    }
}

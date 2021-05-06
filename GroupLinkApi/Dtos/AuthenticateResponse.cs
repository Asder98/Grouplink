using Entities;

namespace Dtos
{
    public class AuthenticateResponse
    {
        public string name { get; set; }
        public string surname { get; set; }
        public string login { get; set; }
        public string Token { get; set; }


        public AuthenticateResponse(Users user, string token)
        {
            name = user.name;
            surname = user.surname;
            login = user.login;
            Token = token;
        }
    }
}

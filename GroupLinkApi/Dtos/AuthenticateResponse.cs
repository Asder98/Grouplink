using Entities;

namespace Dtos
{
    public class AuthenticateResponse
    {
        public int idUser { get; set; }
        public string email { get; set; }
        public string login { get; set; }
        public string Token { get; set; }


        public AuthenticateResponse(Users user, string token)
        {
            idUser = user.idUser;
            email = user.email;
            login = user.login;
            Token = token;
        }
    }
}

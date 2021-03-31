using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GroupLinkApi.Models
{
    public class AuthenticateResponse
    {
        public int idUser { get; set; }
        public string name { get; set; }
        public string surname { get; set; }
        public string login { get; set; }
        public string Token { get; set; }


        public AuthenticateResponse(Users user, string token)
        {
            idUser = user.idUser;
            name = user.name;
            surname = user.surname;
            login = user.login;
            Token = token;
        }
    }
}

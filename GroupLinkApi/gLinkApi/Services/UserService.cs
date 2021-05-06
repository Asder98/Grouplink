using Entities;
using GroupLinkApi.Database.Repositories;
using GroupLinkApi.Helpers;
using GroupLinkApi.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Dtos;

namespace GroupLinkApi.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly AppSettings _appSettings;

        public UserService(IUserRepository userRepository, IOptions<AppSettings> appSettings)
        {
            _userRepository = userRepository;
            _appSettings = appSettings.Value;
        }

        public AuthenticateResponse Authenticate(AuthenticateRequest model)
        {
            if (string.IsNullOrEmpty(model.login) || string.IsNullOrEmpty(model.password))
                return null;

            var user = _userRepository.GetUser(model.login, model.password);

            if (user == null) 
                return null;

            var token = GenerateJwtToken(user);


            return new AuthenticateResponse(user, token);
        }


        public async Task<List<Users>> GetUsers()
        {
            return await _userRepository.GetUsers();
        }

        public Users GetById(int idUser)
        {
            return _userRepository.GetUser(idUser);
        }
        public bool AddUser(RegisterModel registerModel)
        {
            //zobaczymy jakie dane będą podawane przy rejstracji
            var result = _userRepository.Add(new Users
            {
                name = "",
                surname = "",
                email = "",
                login = registerModel.login,
                password = registerModel.password
            }) ;

            return result.Result;
        }

        public bool CheckFreePassword(string password)
        {
            return _userRepository.CheckFreePassword(password);
        }
        public bool CheckFreeLogin(string login)
        {
            return _userRepository.CheckFreeLogin(login);
        }



        private string GenerateJwtToken(Users user)
        {
            // token ważny 7 dni - tak wstępnie
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("idUser", user.idUser.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }

}

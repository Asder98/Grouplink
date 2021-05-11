using Entities;
using Dtos;
using GroupLinkApi.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GroupLinkApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        /// <summary>
        /// Metoda odpowiedzialna za logowanie.
        /// Po podaniu w modelu loginu i hasla osoby istniejacej w bazie zwraca dodatkowo jego dane oraz token do pozniejszej autentyfikacji
        /// </summary>
        /// <param name="model"></param>
        /// <returns>AuthenticateResponse</returns>
        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });//400

            return Ok(response);
        }
        
        /// <summary>
        /// Metoda odpowiedzialna za rejstracje uzytkownika.
        /// Sprawdza czy podane dane sa spojne(haslo) oraz czy nie istnieje osoba w bazie o takich samych danych
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("register")]
        public IActionResult Register(RegisterModel model)
        {            
            if (model.ConfirmPassword != model.password)
                return BadRequest(new { message = "Passwords are different!" }); 
            else if (_userService.CheckFreePassword(model.password))
                return BadRequest(new { message = "Password is inaccessible" });
            else if (_userService.CheckFreeLogin(model.login))
                return BadRequest(new { message = "Login is inaccessible" });

            var result = _userService.AddUser(model);

            if (result)
                return Ok();
            else
                return StatusCode(500);
        }


        [Authorize]
        [HttpGet]
        [Route("asdasd")]
        public async Task<List<Users>> GetUsers()
        {
            return await _userService.GetUsers();
        }
    }
}

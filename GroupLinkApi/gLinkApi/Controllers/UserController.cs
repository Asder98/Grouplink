using Entities;
using GroupLinkApi.Interfaces;
using GroupLinkApi.Models;
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

        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });//400

            return Ok(response);
        }
        

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

        //[Authorize]
        [HttpGet]
        public async Task<List<Users>> GetUsers()
        {
            return await _userService.GetUsers();
        }
    }
}

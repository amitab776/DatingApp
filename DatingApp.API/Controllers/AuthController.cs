using System.Text;
using System.Security.Claims;
using System.Threading.Tasks;
using DatingApp.API.Data;
using DatingApp.API.DTOs;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using System;
using System.IdentityModel.Tokens.Jwt;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRespository _repo;
        public IConfiguration _config { get; }
        public AuthController(IAuthRespository repo, IConfiguration config)
        {
            _config = config;
            _repo = repo;

        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegistration userForRegistration)
        {
            userForRegistration.Username = userForRegistration.Username.ToLower();
            if (await _repo.UserExists(userForRegistration.Username))
                return BadRequest("User already exists");

            var userToCreate = new User
            {
                UserName = userForRegistration.Username
            };

            await _repo.Register(userToCreate, userForRegistration.Password);
            return StatusCode(201);
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLogin userForLogin)
        {
            var userFromRepo = await _repo.Login(userForLogin.Username.ToLower(), userForLogin.Password);

            if (userFromRepo == null)
                return Unauthorized();

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name,userFromRepo.UserName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8
                            .GetBytes(_config.GetSection("AppSettings:Token").Value));

            var signInCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = signInCredentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new
            {
                Token = tokenHandler.WriteToken(token)
            });
        }
    }
}
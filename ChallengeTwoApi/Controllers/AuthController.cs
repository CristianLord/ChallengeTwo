using ChallengeTwoApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using ChallengeTwoApi.Models.ViewModels;
using ChallengeTwoApi.Data;
using Microsoft.EntityFrameworkCore;
using NuGet.Common;

namespace ChallengeTwoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(DatabaseContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        /// <summary>
        /// Sign in a user
        /// </summary>
        /// <param name="login">Login data</param>
        /// <returns></returns>
        [HttpPost("SignIn")]
        public async Task<ActionResult<Response>> SignIn(Login login)
        {
            var user = await IsValid(login);
            if (user is null)
                return BadRequest(new { message = "Invalid credentials" });

            string token = GenerateToken(login.Email);
            user.Password = String.Empty;

            return Ok(new Response { Token = token, User = user });
        }

        /// <summary>
        /// Register a new user
        /// </summary>
        /// <param name="register">Register data</param>
        /// <returns></returns>
        [HttpPost("SignUp")]
        public async Task<ActionResult<Response>> SignUp(Register register)
        {
            try
            {
                if (await EmailExist(register.Email))
                    return BadRequest(new { message = "The email already exist" });

                User user = new()
                {
                    FirstName = register.FirstName,
                    LastName = register.LastName,
                    Email = register.Email,
                    Password = register.Password
                };

                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();

                string token = GenerateToken(register.Email);
                user.Password = String.Empty;

                return Ok(new Response { Token = token, User = user });
            }
            catch
            {
                return Problem("Something went wrong");
            }
        }

        /// <summary>
        /// Verify if the login data is correct
        /// </summary>
        /// <param name="login">Login data</param>
        /// <returns></returns>
        private async Task<User?> IsValid(Login login)
        {
            return await _context.Users.Where(
                item => item.Email == login.Email &&
                item.Password == login.Password).FirstOrDefaultAsync();
        }

        /// <summary>
        /// Verify if the user exist in database.
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        private async Task<bool> EmailExist(string email)
        {
            return await _context.Users.Where(item => item.Email == email).FirstOrDefaultAsync() != null;
        }

        /// <summary>
        /// Generate a JWT token
        /// </summary>
        /// <param name="email">User's email</param>
        /// <returns></returns>
        private string GenerateToken(string email)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Email, email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("JWT:Key").Value));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var securityToken = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials);

            string token = new JwtSecurityTokenHandler().WriteToken(securityToken);
            return token;
        }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChallengeTwoApi.Services.Interfaces;
using ChallengeTwoApi.Data;
using ChallengeTwoApi.Models.ViewModels;
using ChallengeTwoApi.Models;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace ChallengeTwoApi.Services
{
  public class AuthService : IAuthService
  {
    private readonly DatabaseContext _database;
    private readonly IConfiguration _configuration;

    public AuthService(DatabaseContext database, IConfiguration configuration)
    {
      _database = database;
      _configuration = configuration;
    }

    public Task<Response> SignIn(Login loginData)
    {
      throw new NotImplementedException();
    }

    public async Task<User> SignUp(Register registerData)
    {
      User user = new()
      {
        FirstName = registerData.FirstName,
        LastName = registerData.LastName,
        Email = registerData.Email,
        Password = registerData.Password
      };

      await _database.Users.AddAsync(user);
      await _database.SaveChangesAsync();

      user.Password = String.Empty;

      return user;
    }

    public async Task<bool> EmailExists(string email)
    {
      return await _database.Users.Where(item => item.Email == email).FirstOrDefaultAsync() != null;
    }

    public string GenerateToken(string email)
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

    public async Task<User?> IsValid(Login loginData)
    {
      return await _database.Users.Where(
          item => item.Email == loginData.Email &&
          item.Password == loginData.Password).FirstOrDefaultAsync();
    }
  }
}

using ChallengeTwoApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ChallengeTwoApi.Models.ViewModels;
using ChallengeTwoApi.Services.Interfaces;

namespace ChallengeTwoApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AuthController : ControllerBase
  {
    private readonly IAuthService _service;

    public AuthController(IAuthService service)
    {
      _service = service;
    }

    /// <summary>
    /// Sign in a user.
    /// </summary>
    /// <param name="login">Login data from client.</param>
    /// <returns></returns>
    [HttpPost("SignIn")]
    public async Task<ActionResult<Response>> SignIn(Login login)
    {
      try
      {
        var user = await _service.IsValid(login);
        if (user is null)
          return BadRequest(new { message = "Invalid credentials" });

        string token = _service.GenerateToken(login.Email);
        user.Password = String.Empty;

        return Ok(new Response { Token = token, User = user });
      }
      catch (Exception ex)
      {
        return Problem(ex.Message);
      }
    }

    /// <summary>
    /// Register a new user.
    /// </summary>
    /// <param name="register">Register data from client.</param>
    /// <returns></returns>
    [HttpPost("SignUp")]
    public async Task<ActionResult<Response>> SignUp(Register register)
    {
      try
      {
        if (await _service.EmailExists(register.Email))
          return BadRequest(new { message = "The email already exist" });

        var user = await _service.SignUp(register);

        string token = _service.GenerateToken(register.Email);

        return Ok(new Response { Token = token, User = user });
      }
      catch (Exception ex)
      {
        return Problem(ex.Message);
      }
    }

  }
}

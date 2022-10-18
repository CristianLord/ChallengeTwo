using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ChallengeTwoApi.Data;
using ChallengeTwoApi.Models;
using ChallengeTwoApi.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using ChallengeTwoApi.Services.Interfaces;

namespace ChallengeTwoApi.Controllers
{
  [Authorize]
  [Route("api/[controller]")]
  [ApiController]
  public class UsersController : ControllerBase
  {
    private readonly IUserService _service;

    public UsersController(IUserService service)
    {
      _service = service;
    }

    /// <summary>
    /// Gets all of <see cref="User"/>.
    /// </summary>
    /// <returns>A list of <see cref="User"/></returns>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
      try
      {
        var listUsers = await _service.GetUsers();
        return Ok(listUsers);
      }
      catch (Exception ex)
      {
        return Problem(ex.Message);
      }
    }

    /// <summary>
    /// Gets all of <see cref="User"/> in database except current one and their subscriptions.
    /// </summary>
    /// <param name="idUser">User ID.</param>
    /// <returns>A list of <see cref="User"/> without of the user subscriptions.</returns>
    [HttpGet("withoutSubs/{idUser}")]
    public async Task<ActionResult<IEnumerable<UserViewModel>>> GetAllWithoutSubscriptions(int idUser)
    {
      try
      {
        var listUsers = await _service.GetAllWithoutSubscriptions(idUser);
        return Ok(listUsers);
      }
      catch
      {
        return NotFound();
      }
    }

    /// <summary>
    /// Gets a <see cref="User"/> by ID.
    /// </summary>
    /// <param name="id"><see cref="User.Id"/></param>
    /// <returns>A <see cref="User"/></returns>
    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(int id)
    {
      try
      {
        var user = await _service.GetUser(id);

        if (user is null)
        {
          return NotFound();
        }

        return user;
      }
      catch (Exception ex)
      {
        return Problem(ex.Message);
      }
    }

    /// <summary>
    /// Modifies a <see cref="User"/>.
    /// </summary>
    /// <param name="id"><see cref="User.Id"/> to delete.</param>
    /// <param name="user"><see cref="User"/> to update.</param>
    /// <returns></returns>
    [HttpPut("{id}")]
    public async Task<IActionResult> PutUser(int id, User user)
    {
      try
      {
        var userFind = await _service.GetUser(id);

        if (userFind is null)
        {
          return NotFound();
        }

        if(await _service.UpdateUser(id, user))
        {
          return Ok("Updated correctly.");
        }
        else
        {
          return Problem("Failed to update user.");
        }
        
      }
      catch(Exception ex)
      {
        return Problem(ex.Message);
      }
    }

    /// <summary>
    /// Creates a new user in database.
    /// </summary>
    /// <param name="user">A <see cref="User"/> to insert.</param>
    /// <returns></returns>
    [HttpPost]
    public async Task<ActionResult<User>> PostUser(User user)
    {
      try
      {
        var userCreated = await _service.CreateUser(user);

        if(userCreated is null)
        {
          return Problem("Failed to create user.");
        }

        return CreatedAtAction("GetUser", new { id = userCreated.Id }, userCreated);
      }
      catch(Exception ex)
      {
        return Problem(ex.Message);
      }
    }

    /// <summary>
    /// Deletes a user from database.
    /// </summary>
    /// <param name="id"><see cref="User.Id"/> to delete.</param>
    /// <returns></returns>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
      try
      {
        var user = await _service.GetUser(id);
        if (user is null)
        {
          return NotFound();
        }

        if(await _service.DeleteUser(user))
        {
          return NoContent();
        }

        return Problem("Failed to delete user.");
      }
      catch(Exception ex)
      {
        return Problem(ex.Message);
      }
    }

  }

}

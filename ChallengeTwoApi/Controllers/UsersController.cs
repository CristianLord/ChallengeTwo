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

namespace ChallengeTwoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public UsersController(DatabaseContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get all users.
        /// </summary>
        /// <returns>A list of <see cref="User"/></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        /// <summary>
        /// Get all users in database except current one and their subscriptions.
        /// </summary>
        /// <param name="idUser">User ID.</param>
        /// <returns>A list of users without of the user subscriptions.</returns>
        [HttpGet("getWoutSubsc/{idUser}")]
        public async Task<ActionResult<IEnumerable<UserViewModel>>> GetAllWithoutSubscriptions(int idUser)
        {
            try
            {
                var list = await (from user in _context.Users
                                  where
                            !(from s in _context.Subscriptions
                              where s.IdUser == idUser
                              select s.IdSubscribedUser)
                              .Contains(user.Id) && user.Id != idUser
                                  select new UserViewModel
                                  {
                                      Id = user.Id,
                                      Name = user.FirstName + " " + user.LastName
                                  }).ToListAsync();
                return list;
            }
            catch
            {
                return NotFound();
            }
        }

        /// <summary>
        /// Get a user by id.
        /// </summary>
        /// <param name="id">User ID</param>
        /// <returns>A <see cref="User"/></returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        /// <summary>
        /// Modify a user.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            try
            {
                _context.Entry(user).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        /// <summary>
        /// Create a new user in database.
        /// </summary>
        /// <param name="user">A <see cref="User"/> to insert.</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            try
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetUser", new { id = user.Id }, user);
            }
            catch
            {
                return Problem("Failed to insert user");
            }
        }

        /// <summary>
        /// Delete a user from database.
        /// </summary>
        /// <param name="id">User ID</param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                var user = await _context.Users.FindAsync(id);
                if (user == null)
                {
                    return NotFound();
                }

                _context.Users.Remove(user);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch
            {
                return Problem("Failed to delete user");
            }
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }

}
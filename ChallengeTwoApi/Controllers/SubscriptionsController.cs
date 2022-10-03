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
    public class SubscriptionsController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public SubscriptionsController(DatabaseContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get all subscription from database.
        /// </summary>
        /// <returns>A list <see cref="Subscription"/></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Subscription>>> GetAllSubscriptions()
        {
            return await _context.Subscriptions.ToListAsync();
        }

        /// <summary>
        /// Get a user's subscriptions.
        /// </summary>
        /// <param name="idUser">User ID</param>
        /// <returns></returns>
        [HttpGet("GetSubscriptionsUser/{idUser}")]
        public async Task<ActionResult<IEnumerable<UserViewModel>>> GetSubscriptions(int idUser)
        {
            var list = await (from u in _context.Users
                              join s in _context.Subscriptions
                              on u.Id equals s.IdSubscribedUser
                              where s.IdUser == idUser
                              select new UserViewModel
                              {
                                  Id = u.Id,
                                  Name = u.FirstName + " " + u.LastName
                              }).ToListAsync();
            return list;
        }

        /// <summary>
        /// Create  a new subscrition.
        /// </summary>
        /// <param name="subscription">A <see cref="Subscription"/></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<Subscription>> SusbcribedTo(Subscription subscription)
        {
            try
            {
                await _context.Subscriptions.AddAsync(subscription);
                await _context.SaveChangesAsync();

                int id = subscription.Id;

                //CreatedAtAction("GetSubscriptions", subscription)
                return Ok();
            }
            catch
            {
                return Problem("Failed to insert subscription");
            }
        }

        /// <summary>
        /// Unsubscribed a user to other.
        /// </summary>
        /// <param name="idSusbcription">ID of the subcription.</param>
        /// <param name="idUser">ID of the user to unsubcribe.</param>
        /// <returns></returns>
        [HttpDelete("{idUser}/{idSubscribed}")]
        public async Task<IActionResult> Unsubscription(int idUser, int idSubscribed)
        {
            try
            {
                var subscription = await _context.Subscriptions.Where(s => s.IdUser == idUser && s.IdSubscribedUser == idSubscribed)
                .FirstOrDefaultAsync();
                if (subscription == null)
                {
                    return NotFound();
                }

                _context.Subscriptions.Remove(subscription);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch
            {
                return Problem("Failed to subscribe");
            }
        }
    }
}

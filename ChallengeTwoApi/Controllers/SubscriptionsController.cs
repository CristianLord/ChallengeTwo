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
  public class SubscriptionsController : ControllerBase
  {
    private readonly ISubscriptionService _service;

    public SubscriptionsController(ISubscriptionService service)
    {
      _service = service;
    }

    /// <summary>
    /// Gets all of subscriptions from database.
    /// </summary>
    /// <returns>A list of <see cref="Subscription"/></returns>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Subscription>>> GetAllSubscriptions()
    {
      try
      {
        var listSubscriptions = await _service.GetAll();
        return Ok(listSubscriptions);
      }
      catch (Exception ex)
      {
        return Problem(ex.Message);
      }
    }

    /// <summary>
    /// Get a user's subscriptions.
    /// </summary>
    /// <param name="idUser">User ID</param>
    /// <returns></returns>
    [HttpGet("GetSubscriptionsUser/{idUser}")]
    public async Task<ActionResult<IEnumerable<UserViewModel>>> GetSubscriptions(int idUser)
    {
      try
      {
        var listSubscriptions = await _service.GetUserSubscriptions(idUser);
        return Ok(listSubscriptions);
      }
      catch(Exception ex)
      {
        return Problem(ex.Message);
      }
    }

    /// <summary>
    /// Creates a new subscription.
    /// </summary>
    /// <param name="subscription">A <see cref="Subscription"/></param>
    /// <returns></returns>
    [HttpPost]
    public async Task<ActionResult<Subscription>> SusbcribedTo(Subscription subscription)
    {
      try
      {
        if(subscription is null)
        {
            return BadRequest();
        }
        
        if(!(await _service.NewSubscription(subscription)))
        {
            return Problem("Failed to insert subscription."); 
        }

        return NoContent();
      }
      catch(Exception ex)
      {
        return Problem(ex.Message);
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
        var subscription = await _service.GetSubscriptionByUsers(idUser, idSubscribed);
        if (subscription is null)
        {
          return NotFound();
        }

        if (!(await _service.DeleteSubscription(subscription)))
        {
          return Problem("Failed to unsubscribe.");
        }

        return NoContent();
      }
      catch(Exception ex)
      {
        return Problem(ex.Message);
      }
    }
  }
}

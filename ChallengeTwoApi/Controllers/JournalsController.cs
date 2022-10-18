using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ChallengeTwoApi.Data;
using ChallengeTwoApi.Models;
using NuGet.Versioning;
using Microsoft.AspNetCore.Authorization;
using ChallengeTwoApi.Services.Interfaces;

namespace ChallengeTwoApi.Controllers
{
  [Authorize]
  [Route("api/[controller]")]
  [ApiController]
  public class JournalsController : ControllerBase
  {
    private readonly IJournalService _service;

    public JournalsController(IJournalService service)
    {
      _service = service;
    }

    /// <summary>
    /// Gets all journals.
    /// </summary>
    /// <returns>A list of <see cref="Journal"/></returns>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Journal>>> GetJournals()
    {
      try
      {
        var journals = await _service.GetAllJournals();
        return Ok(journals);
      }
      catch (Exception ex)
      {
        return Problem(ex.Message);
      }
    }

    /// <summary>
    /// Gets a <see cref="Journal"/> by ID.
    /// </summary>
    /// <param name="id">Journal ID to find.</param>
    /// <returns>The <see cref="Journal"/> found.</returns>
    [HttpGet("Journal/{id}")]
    public async Task<ActionResult<Journal>> GetJournal(int id)
    {
      try
      {
        var journal = await _service.GetJournalById(id);

        if (journal == null)
          return NotFound();

        return journal;
      }
      catch (Exception ex)
      {
        return Problem(ex.Message);
      }
    }

    /// <summary>
    /// Gets all of user's journals.
    /// </summary>
    /// <param name="id">User ID</param>
    /// <returns></returns>
    [HttpGet("UserJournals/{id}")]
    public async Task<ActionResult<IEnumerable<Journal>>> GetUserJournals(int id)
    {
      try
      {
        var journals = await _service.GetUserJournals(id);

        if (journals is null)
        {
          return NotFound();
        }

        return Ok(journals);
      }
      catch (Exception ex)
      {
        return Problem(ex.Message);
      }
    }

    /// <summary>
    /// Gets all of journals of the users to which a user is suscribed.
    /// </summary>
    /// <returns></returns>
    [HttpGet("SubscriptionsJournals/{id}")]
    public async Task<ActionResult<IEnumerable<Journal>>> GetSubscriptionJournals(int id)
    {
      try
      {
        var journals = await _service.GetSubscriptionJournals(id);

        if (journals is null)
        {
          return NotFound();
        }

        return Ok(journals);
      }
      catch (Exception ex)
      {
        return Problem(ex.Message);
      }
    }

    /// <summary>
    /// Creates a new journal.
    /// </summary>
    /// <param name="form">Journal's data</param>
    /// <returns></returns>
    [HttpPost]
    public async Task<ActionResult<Journal>> PostJournal([FromForm] JournalForm form)
    {
      try
      {
        var journal = new Journal
        {
          Title = form.Title,
          IdUser = form.IdUser,
          File = form.File!
        };

        if (await _service.CreateJournal(journal) is false)
        {
          return Problem("Failed to insert journal.");
        }

        return Ok("Inserted correctly.");
      }
      catch (Exception ex)
      {
        return Problem(ex.Message);
      }
    }

    /// <summary>
    /// Edits a <see cref="Journal" />.
    /// </summary>
    /// <param name="id">Journal ID.</param>
    /// <param name="journalForm">Journal data by form.</param>
    /// <returns></returns>
    [HttpPut("{id}")]
    public async Task<IActionResult> PutJournal(int id, [FromForm] JournalForm journalForm)
    {
      try
      {
        var journal = await _service.JournalExists(id);

        if (journal is null)
        {
          return NotFound();
        }

        journal.Title = journalForm.Title;
        journal.File = journalForm.File;
        if (!(await _service.UpdateJournal(journal)))
        {
          return Problem("Failed to update journal.");
        }

        return Ok("Updated correctly.");
      }
      catch
      {
        return Problem("Failed to update journal.");
      }
    }

    /// <summary>
    /// Deletes a <see cref="Journal"/> by ID.
    /// </summary>
    /// <param name="id">Journal ID.</param>
    /// <returns></returns>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteJournal(int id)
    {
      try
      {
        var journal = await _service.JournalExists(id);
        if (journal is null)
        {
          return NotFound();
        }

        if(!(await _service.DeleteJournal(journal)))
        {
          return Problem("Failed to delete journal.");
        }

        return Ok("Deleted correctly.");
      }
      catch(Exception ex)
      {
        return Problem(ex.Message);
      }
    }
  }
}

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

namespace ChallengeTwoApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class JournalsController : ControllerBase
    {
        private readonly DatabaseContext _context;
        private readonly string _serverPath;
        private readonly IWebHostEnvironment _environment;

        public JournalsController(DatabaseContext context, IWebHostEnvironment environment, IConfiguration configuration)
        {
            _context = context;
            _environment = environment;
            _serverPath = configuration.GetSection("Configuration").GetSection("ServerPath").Value;
        }

        /// <summary>
        /// Get all journals
        /// </summary>
        /// <returns>A list of <see cref="Journal"/></returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Journal>>> GetJournals()
        {
            return await _context.Journals.Include(u => u.User).ToListAsync();
        }

        /// <summary>
        /// Get a journal
        /// </summary>
        /// <returns>A list of <see cref="Journal"/></returns>
        [HttpGet("Journal/{id}")]
        public async Task<ActionResult<Journal>> GetJournal(int id)
        {
            try
            {
                var journal = await _context.Journals.Where(j => j.Id == id).FirstOrDefaultAsync();

                if (journal == null)
                    return NotFound();

                return journal;
            }
            catch
            {
                return Problem();
            }
        }

        /// <summary>
        /// Get all user's journals
        /// </summary>
        /// <returns></returns>
        [HttpGet("UserJournals/{id}")]
        public async Task<ActionResult<IEnumerable<Journal>>> GetUserJournals(int id)
        {
            try
            {
                return await _context.Journals.Where(user => user.IdUser == id).ToListAsync();
            }
            catch
            {
                return NotFound();
            }
        }

        /// <summary>
        /// Get all journals of their subscriptions
        /// </summary>
        /// <returns></returns>
        [HttpGet("SubscriptionsJournals/{id}")]
        public async Task<ActionResult<IEnumerable<Journal>>> GetSubscriptionJournals(int id)
        {
            try
            {
                var list = await (from j in _context.Journals
                                  where
                                  (from s in _context.Subscriptions
                                   where s.IdUser == id
                                   select s.IdSubscribedUser)
                                   .Contains(j.IdUser) && j.IdUser != id
                                  select j).Include("User").OrderByDescending(m => m.UploadDate).ToListAsync();
                return list;
            }
            catch
            {
                return NotFound();
            }
        }

        /// <summary>
        /// Edit a journal
        /// </summary>
        /// <param name="id"></param>
        /// <param name="journal"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJournal(int id, Journal journal)
        {
            if (id != journal.Id)
            {
                return BadRequest();
            }

            try
            {
                _context.Entry(journal).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JournalExists(id))
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
        /// Create a new journal
        /// </summary>
        /// <param name="journal"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult<Journal>> PostJournal([FromForm] JournalForm form)
        {
            try
            {
                var fileName = Guid.NewGuid() + form.File.FileName;
                var path = Path.Combine(_environment.WebRootPath, "Journals", fileName);

                using(FileStream newFile = System.IO.File.Create(path))
                {
                    form.File.CopyTo(newFile);
                    newFile.Flush();
                }

                var journal = new Journal
                {
                    Title = form.Title,
                    IdUser = form.IdUser,
                    PathFile = _serverPath + fileName,
                    UploadDate = DateTime.Now
                };

                _context.Journals.Add(journal);
                await _context.SaveChangesAsync();

                return Ok("Inserted correctly");

            }
            catch
            {
                return Problem("Failed to insert journal");
            }
        }

        /// <summary>
        /// Delete a journal by ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJournal(int id)
        {
            try
            {
                var journal = await _context.Journals.FindAsync(id);
                if (journal == null)
                {
                    return NotFound();
                }

                _context.Journals.Remove(journal);
                await _context.SaveChangesAsync();

                return Ok();
            }
            catch
            {
                return Problem("Failed to delete journal");
            }
        }

        private bool JournalExists(int id)
        {
            return _context.Journals.Any(e => e.Id == id);
        }
    }
}

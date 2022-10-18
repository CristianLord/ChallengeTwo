using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChallengeTwoApi.Data;
using ChallengeTwoApi.Models;
using ChallengeTwoApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ChallengeTwoApi.Services
{
  public class JournalService : IJournalService
  {
    private readonly DatabaseContext _database;
    private readonly string _serverPath;
    private readonly IWebHostEnvironment _environment;

    public JournalService(DatabaseContext database, IWebHostEnvironment environment, IConfiguration configuration)
    {
      _database = database;
      _environment = environment;
      _serverPath = configuration.GetSection("Configuration").GetSection("ServerPath").Value;
    }

    public string? CreateFileJournal(IFormFile file)
    {
      try
      {
        var fileName = Guid.NewGuid() + file.FileName;
        var path = Path.Combine(_environment.WebRootPath, "Journals", fileName);

        using (FileStream newFile = System.IO.File.Create(path))
        {
          file.CopyTo(newFile);
          newFile.Flush();
        }

        return fileName;
      }
      catch
      {
        return null;
      }
    }

    public async Task<bool> CreateJournal(Journal journal)
    {
      string? fileName = CreateFileJournal(journal.File!);

      if (fileName is null)
      {
        return false;
      }

      var journalInsert = new Journal
      {
        Title = journal.Title,
        IdUser = journal.IdUser,
        PathFile = _serverPath + fileName,
        UploadDate = DateTime.Now
      };

      await _database.Journals.AddAsync(journalInsert);
      return await _database.SaveChangesAsync() > 0;
    }

    public bool DeleteFileJournal(string path)
    {
      try
      {
        var fileIndex = path.LastIndexOf('/') + 1;
        var fileName = path[fileIndex..];

        System.IO.File.Delete(Path.Combine(_environment.WebRootPath, "Journals", fileName));

        return true;
      }
      catch
      {
        return false;
      }
    }

    public async Task<bool> DeleteJournal(Journal journal)
    {
      if (!(DeleteFileJournal(journal.PathFile!)))
      {
        return false;
      }

      _database.Journals.Remove(journal);
      return await _database.SaveChangesAsync() > 0;
    }

    public async Task<IEnumerable<Journal>> GetAllJournals()
    {
      return await _database.Journals.Include(u => u.User).ToListAsync();
    }

    public async Task<Journal?> GetJournalById(int id)
    {
      return await _database.Journals.Where(journal => journal.Id == id).FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<Journal>?> GetSubscriptionJournals(int idUser)
    {
      if (await _database.Users.FindAsync(idUser) is null)
      {
        return null;
      }
      else
      {
        var journals = await (from j in _database.Journals
                              where
                              (from s in _database.Subscriptions
                               where s.IdUser == idUser
                               select s.IdSubscribedUser)
                              .Contains(j.IdUser) && j.IdUser != idUser
                              select j).Include("User").OrderByDescending(m => m.UploadDate).ToListAsync();

        return journals;
      }
    }

    public async Task<IEnumerable<Journal>?> GetUserJournals(int idUser)
    {
      if (idUser is 0)
        return null;

      var user = await _database.Users.Where(user => user.Id == idUser).FirstOrDefaultAsync();

      if (user is null)
        return null;

      return await _database.Journals.Where(user => user.IdUser == idUser).ToListAsync();
    }

    public Task<Journal?> JournalExists(int id)
    {
      return _database.Journals.Where(j => j.Id == id).FirstOrDefaultAsync();
    }

    public async Task<bool> UpdateJournal(Journal journal)
    {
      if (journal.File is not null)
      {
        if (!(DeleteFileJournal(journal.PathFile!)))
        {
          return false;
        }

        string? fileName = CreateFileJournal(journal.File!);

        if (fileName is null)
        {
          return false;
        }

        journal.PathFile = _serverPath + fileName;
      }

      journal.UploadDate = DateTime.Now;

      _database.Entry(journal).State = EntityState.Modified;
      return await _database.SaveChangesAsync() > 0;
    }
  }
}
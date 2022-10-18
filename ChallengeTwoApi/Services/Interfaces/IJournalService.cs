using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChallengeTwoApi.Models;

namespace ChallengeTwoApi.Services.Interfaces
{
  public interface IJournalService
  {
    /// <summary>
    /// Gets all of <see cref="Journal"/> from database.
    /// </summary>
    /// <returns>A list of <see cref="Journal"/></returns>
    Task<IEnumerable<Journal>> GetAllJournals();

    /// <summary>
    /// Gets all of user's journals from database.
    /// </summary>
    /// <param name="idUser">User ID.</param>
    /// <returns>A list of <see cref="Journal"/> found, or null</returns>
    Task<IEnumerable<Journal>?> GetUserJournals(int idUser);

    /// <summary>
    /// Gets all of journals of the users to which a user is suscribed from database.
    /// </summary>
    /// <param name="idUser">User ID.</param>
    /// <returns>A list of <see cref="Journal"/></returns>
    Task<IEnumerable<Journal>?> GetSubscriptionJournals(int idUser);

    /// <summary>
    /// Gets a <see cref="Journal"/> by ID from database.
    /// </summary>
    /// <param name="id">Journal ID to find.</param>
    /// <returns>The <see cref="Journal"/> found, or null.</returns>
    Task<Journal?> GetJournalById(int id);

    /// <summary>
    /// Checks if the <see cref="Journal"/> exists in database.
    /// </summary>
    /// <param name="id">Journal ID to find.</param>
    /// <returns>The <see cref="Journal"/> found, or null.</returns>
    Task<Journal?> JournalExists(int id);

    /// <summary>
    /// Create static file in the application.
    /// </summary>
    /// <param name="file">File to save.</param>
    /// <returns>The file name, or null.</returns>
    string? CreateFileJournal(IFormFile file);

    /// <summary>
    /// Deletes a journal file by path.
    /// </summary>
    /// <param name="path">Path of the journal file in project.</param>
    /// <returns>A <see cref="bool"/> that specifies if the operation was successful.</returns>
    bool DeleteFileJournal(string path);

    /// <summary>
    /// Creates a new <see cref="Journal"/> in database.
    /// </summary>
    /// <param name="journal">The <see cref="Journal"/> to insert.</param>
    /// <returns>A <see cref="bool"/> that specifies if the operation was successful.</returns>
    Task<bool> CreateJournal(Journal journal);

    /// <summary>
    /// Updates a <see cref="Journal" /> in database.
    /// </summary>
    /// <param name="journal">The <see cref="Journal" /> to update.</param>
    /// <returns>A <see cref="bool"/> that specifies if the operation was successful.</returns>
    Task<bool> UpdateJournal(Journal journal);

    /// <summary>
    /// Deletes a <see cref="Journal"/> by ID in database.
    /// </summary>
    /// <param name="journal">The <see cref="Journal" /> to delete.</param>
    /// <returns>A <see cref="bool"/> that specifies if the operation was successful.</returns>
    Task<bool> DeleteJournal(Journal journal);
  }
}
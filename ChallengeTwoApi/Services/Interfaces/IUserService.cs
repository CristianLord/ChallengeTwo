using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChallengeTwoApi.Models;
using ChallengeTwoApi.Models.ViewModels;

namespace ChallengeTwoApi.Services.Interfaces
{
  public interface IUserService
  {
    /// <summary>
    /// Gets all users in database.
    /// </summary>
    /// <returns>A list of <see cref="User"/></returns>
    Task<IEnumerable<User>> GetUsers();

    /// <summary>
    /// Gets all users in database except current one and their subscriptions.
    /// </summary>
    /// <param name="idUser">User ID.</param>
    /// <returns>A list of users without of the user subscriptions.</returns>
    Task<IEnumerable<UserViewModel>> GetAllWithoutSubscriptions(int idUser);

    /// <summary>
    /// Gets a <see cref="User"/> from database by ID.
    /// </summary>
    /// <param name="idUser"><see cref="User"/> to gets.</param>
    /// <returns>A <see cref="User"/> found, or null.</returns>
    Task<User?> GetUser(int idUser);

    /// <summary>
    /// Checks if a <see cref="User"/> exists in database.
    /// </summary>
    /// <param name="idUser"><see cref="User.Id"/> to check.</param>
    /// <returns>A <see cref="bool"/> that specifies if the <see cref="User"/> exists.</returns>
    Task<bool> UserExists(int idUser);

    /// <summary>
    /// Inserts a <see cref="User"/> in database.
    /// </summary>
    /// <param name="idUser"><see cref="User"/> to create.</param>
    /// <returns>The <see cref="User"/> created in database.</returns>
    Task<User?> CreateUser(User user);

    /// <summary>
    /// Modifies a <see cref="User"/> in database.
    /// </summary>
    /// <param name="idUser"><see cref="User.Id"/> to update.</param>
    /// <param name="user"><see cref="User"/> to update.</param>
    /// <returns>A <see cref="bool"/> that specifies if the operation was successful.</returns>
    Task<bool> UpdateUser(int idUser, User user);

    /// <summary>
    /// Deletes a <see cref="User"/> in database.
    /// </summary>
    /// <param name="user"><see cref="User"/> to delete.</param>
    /// <returns>A <see cref="bool"/> that specifies if the operation was successful.</returns>
    Task<bool> DeleteUser(User user);

  }
}
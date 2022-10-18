using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChallengeTwoApi.Data;
using ChallengeTwoApi.Models;
using ChallengeTwoApi.Models.ViewModels;
using ChallengeTwoApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ChallengeTwoApi.Services
{
  public class UserService : IUserService
  {
    private readonly DatabaseContext _database;

    public UserService(DatabaseContext database)
    {
      _database = database;
    }

    public async Task<User?> CreateUser(User user)
    {
      try
      {
        _database.Users.Add(user);
        await _database.SaveChangesAsync();
        return user;
      }
      catch
      {
        return null;
      }
    }

    public async Task<bool> DeleteUser(User user)
    {
      _database.Users.Remove(user);
      return await _database.SaveChangesAsync() > 0;
    }

    public async Task<IEnumerable<UserViewModel>> GetAllWithoutSubscriptions(int idUser)
    {
      var listUsers = await (from user in _database.Users
                             where
                       !(from s in _database.Subscriptions
                         where s.IdUser == idUser
                         select s.IdSubscribedUser)
                         .Contains(user.Id) && user.Id != idUser
                             select new UserViewModel
                             {
                               Id = user.Id,
                               Name = user.FirstName + " " + user.LastName
                             }).ToListAsync();
      return listUsers;
    }

    public async Task<User?> GetUser(int idUser)
    {
      var user = await _database.Users.FindAsync(idUser);
      return user;
    }

    public async Task<IEnumerable<User>> GetUsers()
    {
      return await _database.Users.ToListAsync();
    }

    public async Task<bool> UpdateUser(int idUser, User user)
    {
      var userFind = await GetUser(idUser);
      if(userFind is null)
      {
        return false;
      }

      userFind.FirstName = user.FirstName;
      userFind.LastName = user.LastName;

      if(!string.IsNullOrEmpty(user.Email)) userFind.Email = user.Email;
      if(!string.IsNullOrEmpty(user.Password)) userFind.Password = user.Password;

      _database.Entry(userFind).State = EntityState.Modified;
      return await _database.SaveChangesAsync() > 0;
    }

    public async Task<bool> UserExists(int idUser)
    {
      return await _database.Users.FindAsync(idUser) != null;
    }
  }
}
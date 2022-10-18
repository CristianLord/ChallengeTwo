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
  public class SubscriptionService : ISubscriptionService
  {
    private readonly DatabaseContext _database;

    public SubscriptionService(DatabaseContext database)
    {
      _database = database;
    }

    public async Task<IEnumerable<Subscription>> GetAll()
    {
      var listSubscriptions = await _database.Subscriptions.ToListAsync();
      return listSubscriptions;
    }

    public async Task<Subscription?> GetSubscriptionByUsers(int idUser, int idSubscribed)
    {
      var subscription = await _database.Subscriptions
      .Where(s => s.IdUser == idUser &&
                  s.IdSubscribedUser == idSubscribed)
      .FirstOrDefaultAsync();

      return subscription;
    }

    public async Task<IEnumerable<UserViewModel>> GetUserSubscriptions(int idUser)
    {
      var listSubscriptions = await (from u in _database.Users
        join s in _database.Subscriptions
        on u.Id equals s.IdSubscribedUser
        where s.IdUser == idUser
        select new UserViewModel
        {
          Id = u.Id,
          Name = u.FirstName + " " + u.LastName
        }).ToListAsync();

      return listSubscriptions;
    }

    public async Task<bool> NewSubscription(Subscription subscription)
    {
      await _database.Subscriptions.AddAsync(subscription);
      return await _database.SaveChangesAsync() > 0;
    }

    public async Task<bool> DeleteSubscription(Subscription subscription)
    {
      _database.Subscriptions.Remove(subscription);
      return await _database.SaveChangesAsync() > 0;
    }
  }
}
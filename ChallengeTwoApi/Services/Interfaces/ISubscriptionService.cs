using ChallengeTwoApi.Models;
using ChallengeTwoApi.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChallengeTwoApi.Services.Interfaces
{
    public interface ISubscriptionService
    {
        /// <summary>
        /// Gets all of subscriptions from database.
        /// </summary>
        /// <returns>A list of <see cref="Subscription"/></returns>
        Task<IEnumerable<Subscription>> GetAll();

        /// <summary>
        /// Gets a list <see cref="UserViewModel"/> by user's ID.
        /// </summary>
        /// <returns>A list of <see cref="UserViewModel"/></returns>
        Task<IEnumerable<UserViewModel>> GetUserSubscriptions(int idUser);

        /// <summary>
        /// Creates a new subscription in database.
        /// </summary>
        /// <param name="subscription">A <see cref="Subscription"/></param>
        /// <returns>A <see cref="bool"/> that specifies if the operation was successful.</returns>
        Task<bool> NewSubscription(Subscription subscription);

        /// <summary>
        /// Deletes a subscription in databse.
        /// </summary>
        /// <param name="subscription">The <see cref="Subscription"/> to delete.</param>
        /// <returns>A <see cref="bool"/> that specifies if the operation was successful.</returns>
        Task<bool> DeleteSubscription(Subscription subscription);

        /// <summary>
        /// Gets a <see cref="Subscription"/> by user IDs.
        /// </summary>
        /// <param name="idUser">ID of the user subscribed.</param>
        /// <param name="idSubscribed">ID of the user to subscribe.</param>
        /// <returns>The <see cref="Subscription"/> found, or null.</returns>
        Task<Subscription?> GetSubscriptionByUsers(int idUser, int idSubscribed);
    }
}

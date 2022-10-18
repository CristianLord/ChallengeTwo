using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChallengeTwoApi.Models;
using ChallengeTwoApi.Models.ViewModels;

namespace ChallengeTwoApi.Services.Interfaces
{
    public interface IAuthService
    {
        Task<Response> SignIn(Login loginData);

        /// <summary>
        /// Register a new user.
        /// </summary>
        /// <param name="register">Register data.</param>
        /// <returns></returns>
        Task<User> SignUp(Register registerData);

        /// <summary>
        /// Checks if there is a user with login data
        /// </summary>
        /// <param name="login">Login data</param>
        /// <returns></returns>
        Task<User?> IsValid(Login loginData);

        /// <summary>
        /// Checks if the user exist in database.
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        Task<bool> EmailExists(string email);

        /// <summary>
        /// Generate a JWT token.
        /// </summary>
        /// <param name="email">User's email</param>
        /// <returns></returns>
        string GenerateToken(string email);
    }
}
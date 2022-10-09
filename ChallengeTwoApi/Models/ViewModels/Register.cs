namespace ChallengeTwoApi.Models.ViewModels
{
    /// <summary>
    /// This is the model to register a new user.
    /// </summary>
    public class Register
    {
        public string Email { get; set; } = string.Empty;

        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string Password { get; set; } = string.Empty;
    }
}

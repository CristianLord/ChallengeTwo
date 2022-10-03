using ChallengeTwoApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ChallengeTwoApi.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Subscription> Subscriptions { get; set; }
        public DbSet<Journal> Journals { get; set; }
    }
}


using Microsoft.EntityFrameworkCore;

namespace CreateADate.Repository
{
    public partial class CreateADateContext : DbContext
    {
        public CreateADateContext(DbContextOptions<CreateADateContext> options) : base(options)
        {
        }

        public DbSet<Activity> Activities { get; set; }
        public DbSet<Date> Dates { get; set; }
        public DbSet<Location> Locations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Activity>().ToTable("Activity");
            modelBuilder.Entity<Date>().ToTable("Date");
            modelBuilder.Entity<Location>().ToTable("Location");
        }
    }
}

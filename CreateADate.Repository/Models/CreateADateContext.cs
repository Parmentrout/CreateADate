using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using CreateADate.Repository.Models.Mapping;

namespace CreateADate.Repository.Models
{
    public partial class CreateADateContext : DbContext
    {
        static CreateADateContext()
        {
            Database.SetInitializer<CreateADateContext>(null);
        }

        public CreateADateContext()
            : base("Name=CreateADateContext")
        {
        }

        public DbSet<Activity> Activities { get; set; }
        public DbSet<Date> Dates { get; set; }
        public DbSet<Location> Locations { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new ActivityMap());
            modelBuilder.Configurations.Add(new DateMap());
            modelBuilder.Configurations.Add(new LocationMap());
        }
    }
}

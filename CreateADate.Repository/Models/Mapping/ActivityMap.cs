using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace CreateADate.Repository.Models.Mapping
{
    public class ActivityMap : EntityTypeConfiguration<Activity>
    {
        public ActivityMap()
        {
            // Primary Key
            this.HasKey(t => t.ActivityId);

            // Properties
            this.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.Address)
                .HasMaxLength(255);

            this.Property(t => t.Description)
                .HasMaxLength(255);

            // Table & Column Mappings
            this.ToTable("Activity");
            this.Property(t => t.ActivityId).HasColumnName("ActivityId");
            this.Property(t => t.LocationId).HasColumnName("LocationId");
            this.Property(t => t.Name).HasColumnName("Name");
            this.Property(t => t.Address).HasColumnName("Address");
            this.Property(t => t.ActivityOrder).HasColumnName("ActivityOrder");
            this.Property(t => t.OptionId).HasColumnName("OptionId");
            this.Property(t => t.Description).HasColumnName("Description");

            // Relationships
            this.HasRequired(t => t.Location)
                .WithMany(t => t.Activities)
                .HasForeignKey(d => d.LocationId);

        }
    }
}

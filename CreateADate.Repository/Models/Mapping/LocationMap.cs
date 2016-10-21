using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace CreateADate.Repository.Models.Mapping
{
    public class LocationMap : EntityTypeConfiguration<Location>
    {
        public LocationMap()
        {
            // Primary Key
            this.HasKey(t => t.LocationId);

            // Properties
            this.Property(t => t.Name)
                .IsRequired()
                .HasMaxLength(50);

            this.Property(t => t.Address)
                .HasMaxLength(255);

            // Table & Column Mappings
            this.ToTable("Location");
            this.Property(t => t.LocationId).HasColumnName("LocationId");
            this.Property(t => t.Name).HasColumnName("Name");
            this.Property(t => t.Address).HasColumnName("Address");
            this.Property(t => t.DateId).HasColumnName("DateId");
            this.Property(t => t.CreatedDate).HasColumnName("CreatedDate");

            // Relationships
            this.HasOptional(t => t.Date)
                .WithMany(t => t.Locations)
                .HasForeignKey(d => d.DateId);

        }
    }
}

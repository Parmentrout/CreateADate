using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;

namespace CreateADate.Repository.Models.Mapping
{
    public class DateMap : EntityTypeConfiguration<Date>
    {
        public DateMap()
        {
            // Primary Key
            this.HasKey(t => t.DateId);

            // Properties
            this.Property(t => t.Name)
                .HasMaxLength(255);

            // Table & Column Mappings
            this.ToTable("Date");
            this.Property(t => t.DateId).HasColumnName("DateId");
            this.Property(t => t.UserId).HasColumnName("UserId");
            this.Property(t => t.Name).HasColumnName("Name");
            this.Property(t => t.CreatedDate).HasColumnName("CreatedDate");
            this.Property(t => t.IsDemo).HasColumnName("IsDemo");
        }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CreateADate.Repository
{
    public partial class Date
    {
        public Date()
        {
            this.Locations = new List<Location>();
        }

        [Key]
        public int DateId { get; set; }

        public string Email { get; set; }

        public int UserId { get; set; }
        public int DateToken { get; set; }
        public string Name { get; set; }
        public Nullable<System.DateTimeOffset> CreatedDate { get; set; }
        public Nullable<bool> IsDemo { get; set; }
        public virtual ICollection<Location> Locations { get; set; }
    }
}

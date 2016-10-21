using System;
using System.Collections.Generic;

namespace CreateADate.Repository.Models
{
    public partial class Date
    {
        public Date()
        {
            this.Locations = new List<Location>();
        }

        public int DateId { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public Nullable<System.DateTimeOffset> CreatedDate { get; set; }
        public Nullable<bool> IsDemo { get; set; }
        public virtual ICollection<Location> Locations { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace CreateADate.Repository
{
    public partial class Location
    {
        public Location()
        {
            this.Activities = new List<Activity>();
        }

        public int LocationId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public Nullable<int> DateId { get; set; }
        public Nullable<System.DateTimeOffset> CreatedDate { get; set; }
        public virtual ICollection<Activity> Activities { get; set; }
        public virtual Date Date { get; set; }
    }
}

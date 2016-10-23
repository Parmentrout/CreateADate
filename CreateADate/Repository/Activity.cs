using System;
using System.Collections.Generic;

namespace CreateADate.Repository
{
    public partial class Activity
    {
        public int ActivityId { get; set; }
        public int LocationId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public int ActivityOrder { get; set; }
        public Nullable<int> OptionId { get; set; }
        public string Description { get; set; }
        public virtual Location Location { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CreateADate.Repository;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace CreateADate.Controllers
{
    [Route("api/date")]
    public class DateController : Controller
    {
        private readonly CreateADateContext _context;

        public DateController(CreateADateContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("PostNewDate")]
        public JsonResult PostNewDate([FromBody] Date date)
        {
            date.CreatedDate = DateTimeOffset.Now;

            _context.Dates.Add(date);
            _context.SaveChanges();
            

            return Json(date.DateId);
        }

        [HttpGet]
        [Route("GetDate")]
        public JsonResult GetDate(int id)
        {
            Date date = _context.Dates.Where(d => d.DateId == id).FirstOrDefault();

            if (date != null)
            {
                //This will auto load the underlying entities due to EF Magic I guess
                date.Locations = _context.Locations.Where(loc => loc.DateId == date.DateId).ToList();

                foreach (var loc in date.Locations)
                {
                    //This will automatically load the entities 
                    var activities = _context.Activities.Where(act => act.LocationId == loc.LocationId).OrderBy(x => x.ActivityOrder).ToList();
                }


                return Json(date);
            }

            return Json(string.Empty);
        }
    }
}

/* var testDate = new Date()
            {
                UserId = 1,
                Name = "Test",
                Locations = new List<Location>()
                {
                    new Location()
                    {
                        Name = "loc1",
                        Activities = new List<Activity>()
                        {
                            new Activity()
                            {
                                Name = "Act1",
                                Description = "what",
                                OptionId = 1,
                                ActivityOrder = 1
                            }
                        }
                    },
                    new Location()
                    {
                        Name = "loc2",
                        Activities = new List<Activity>()
                        {
                            new Activity()
                            {
                                Name = "Act1",
                                Description = "what",
                                OptionId = 1,
                                ActivityOrder = 1
                            }
                        }
                    }
                }
            };
            */
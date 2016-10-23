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
            var testDate = new Date()
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

            //_context.Dates.Add(testDate);
            //_context.SaveChanges();
            

            return Json(string.Empty);
        }
    }
}

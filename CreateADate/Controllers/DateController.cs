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
        public JsonResult PostNewDate(Date date)
        {


            return Json(string.Empty);
        }
    }
}

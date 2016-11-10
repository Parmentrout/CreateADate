using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CreateADate.Repository;
using MimeKit;
using MailKit.Net.Smtp;
using MailKit.Security;

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
        public async Task<JsonResult> PostNewDate([FromBody] Date date)
        {
            date.CreatedDate = DateTimeOffset.Now;

            _context.Dates.Add(date);
            _context.SaveChanges();

            await SendEmailAsync(date.Email, "Your Create a Date is Ready!", "createadate.azurewebsites.net/date/" + date.DateId);
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

        private async Task SendEmailAsync(string email, string subject, string message)
        {
            //http://stackoverflow.com/questions/33496290/how-to-send-email-by-using-mailkit

            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress("Armentrout Family", "patrick.armentrout@gmail.com"));
            emailMessage.To.Add(new MailboxAddress("", email));
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart("plain") { Text = message };

            using (var client = new SmtpClient())
            {
                try
                {
                    await client.ConnectAsync("smtp.gmail.com", 587).ConfigureAwait(false);
                    // Note: since we don't have an OAuth2 token, disable
                    // the XOAUTH2 authentication mechanism.
                    client.AuthenticationMechanisms.Remove("XOAUTH2");

                    // Note: only needed if the SMTP server requires authentication
                    await client.AuthenticateAsync("patrick.armentrout@gmail.com", "Legnbass50!");
                    await client.SendAsync(emailMessage).ConfigureAwait(false);
                }
                catch(Exception ex)
                {
                    throw;
                }

                await client.DisconnectAsync(true).ConfigureAwait(false);
            }
        }
    }
}
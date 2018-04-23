using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using LiveGallery.Models;
using LiveGallery.ViewModels;
using LiveGallery.DataAccess;
using System;
using System.Security.Claims;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;

namespace LiveGallery.Controllers
{
    public class AccountController : Controller
    {
        private readonly ApplicationContext _context;

        public AccountController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody]RegisterViewModel model)
        {
            var user = _context.Users.FirstOrDefault(x => x.Email == model.Email);
            if (user == null)
            {
                User newUser = new User
                {
                    ID = Guid.NewGuid().ToString(),
                    Email = model.Email,
                    UserName = model.UserName,
                    PasswordHash = LiveGallery.Helpers.RijndaelForPassword.EncryptStringAES(model.Password, model.Email),
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    PhotoURL = model.PhotoURL
                };
                _context.Users.Add(newUser);
                await _context.SaveChangesAsync();
                await this.Authenticate(newUser);
                return Json("User registered");
            }
            else return BadRequest("Error. User found in DB");
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody]LoginViewModel model)
        {
            if (model.Email == null || model.Password == null) return Json("Model filed null");
            var user = _context.Users.FirstOrDefault(x => x.Email == model.Email);
            if (user != null && model.Password == LiveGallery.Helpers.RijndaelForPassword.DecryptStringAES(user.PasswordHash, user.Email))
            {
                await Authenticate(user);
                return Json(user);
            }
            else return BadRequest("Try again");
        }

        [HttpPost]
        public async Task<IActionResult> LogOff()
        {
            await HttpContext.SignOutAsync();
            return Json("ok");
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            return Json(_context.Users.OrderBy(x => x.UserName).ToList());
        }

        [HttpGet]
        public IActionResult GetUser(string userID)
        {
            if (userID != null)
            {
                var user = _context.Users.FirstOrDefault(x => x.ID == userID);
                if (user == null)
                {
                    return BadRequest("User npt found");
                }
                else return Json(user);
            }
            else return BadRequest("userID null");
        }

        //[HttpPost]
        //public async Task<IActionResult> Subscribe([FromBody]SubscribeViewModel model)
        //{
        //    var user = _context.Users.Where(x => x.ID == model.UserId).FirstOrDefault();
        //    if (user != null)
        //    {
        //        if (user.SubscribersId.Contains(model.SubscriberId))
        //            user.SubscribersId.Remove(model.SubscriberId);
        //        else user.SubscribersId.Add(model.SubscriberId);

        //        await _context.SaveChangesAsync();

        //        return Ok();
        //    }
        //    return BadRequest("user not found");
        //}

        private async Task Authenticate(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.Email)
            };
            ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        }
    }
}
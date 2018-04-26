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
                else
                {
                    GetUserResponseModel model = new GetUserResponseModel();
                    model.User = user;
                    model.Subscribers = _context.Subscribers
                                                            .Where(x => x.UserId == userID)
                                                            .Select(x => x.SubscriberId)
                                                            .ToList();

                    return Json(model);
                }
            }
            else return BadRequest("userID null");
        }

        [HttpPost]
        public async Task<IActionResult> Subscribe([FromBody]SubscribeViewModel model)
        {
            var subs = _context.Subscribers
                                            .Where(x => x.UserId == model.UserId && x.SubscriberId == model.SubscriberId)
                                            .FirstOrDefault();

            if(subs != null)
            {
                _context.Subscribers.Remove(subs);
            }
            else
            {
                _context.Subscribers.Add(new Models.Subscribe()
                {
                    Id = Guid.NewGuid().ToString(),
                    SubscriberId = model.SubscriberId,
                    UserId = model.UserId
                });
            }

            await _context.SaveChangesAsync();

            return Ok();
        }

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
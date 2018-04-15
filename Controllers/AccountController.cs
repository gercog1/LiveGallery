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

namespace LiveGallery.Controllers
{
    public class AccountController : Controller
    {
        private readonly ApplicationContext _context;

        public AccountController(ApplicationContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid && model.Password == model.PasswordConfirm)
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
                    return Ok();
                }
            }
            return Json("error");
        }

        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = _context.Users.FirstOrDefault(x => x.Email == model.Email);
                if (user != null && model.Password == LiveGallery.Helpers.RijndaelForPassword.DecryptStringAES(user.PasswordHash, user.Email))
                {
                    await Authenticate(user);
                    return Ok();
                }
                else return Json("Try again");
            }
            else return Json("Fail model");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> LogOff()
        {
            await HttpContext.SignOutAsync();
            return Json("ok");
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
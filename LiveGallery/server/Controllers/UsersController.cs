using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using LiveGallery.ViewModels;
using LiveGallery.Models;
using LiveGallery.DataAccess;
using LiveGallery.Helpers;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Security.Claims;
using System.Net;
using Microsoft.AspNetCore.Authentication;

namespace WebApi.Controllers
{
    [Authorize]
    public class UsersController : Controller
    {
        private ApplicationContext _context;
        private IMapper _mapper;

        public UsersController(IMapper mapper, ApplicationContext context)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == model.Email);
                if (user == null && model.Password == model.PasswordConfirm)
                {
                    user = new User
                    {
                        Email = model.Email,
                        PasswordHash = RijndaelForPassword.EncryptStringAES(model.Password, model.Email),
                        UserName = model.UserName,
                        FirstName = model.FirstName,
                        LastName = model.LastName,
                        PhotoURL = model.PhotoURL
                    };
                    _context.Users.Add(user);
                    await _context.SaveChangesAsync();

                    return Ok();
                }
                else return BadRequest("Password not equals confirmPassword");
            }
            else return BadRequest();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == model.Email);
                if (user == null) return BadRequest("User not found");
                if (model.Password == RijndaelForPassword.DecryptStringAES(user.PasswordHash, user.Email))
                {
                    var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Email, user.Email, ClaimValueTypes.String),
                        new Claim(ClaimTypes.Surname, user.FirstName, ClaimValueTypes.String),
                        new Claim(ClaimTypes.UserData, user.UserName, ClaimValueTypes.String)
                    };
                    var userIdentity = new ClaimsIdentity(claims, "Passport");

                    var userPrincipal = new ClaimsPrincipal(userIdentity);

                    await HttpContext.Authentication.SignInAsync("Cookie", userPrincipal,
                            new Microsoft.AspNetCore.Http.Authentication.AuthenticationProperties
                            {
                                ExpiresUtc = DateTime.UtcNow.AddMinutes(20),
                                IsPersistent = false,
                                AllowRefresh = false
                            });
                    return Ok();
                }
                else return BadRequest("Incorrect password");
            }
            else return BadRequest();
        }
    }
}


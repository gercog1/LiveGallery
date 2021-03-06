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
using System.IO;


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
        public async Task<IActionResult> Register([FromForm]RegisterViewModel model)
        {
            var user = _context.Users.FirstOrDefault(x => x.Email == model.Email || x.UserName == model.UserName);

            if (user == null)
            {
                if (model.Photo == null)
                {
                    return BadRequest("file null");
                }

                if (!Directory.Exists(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images")))
                {
                    Directory.CreateDirectory(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images"));
                }

                string ext = string.Empty;

                try
                {
                    ext = model.Photo.FileName.Split(new char[] { '.' }, StringSplitOptions.RemoveEmptyEntries)[1];
                }
                catch (Exception)
                {
                    return BadRequest("bad file");
                }

                string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", model.Photo.FileName);
                string newFileName = model.UserName + Guid.NewGuid().ToString() + "." + ext;
                string newPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", newFileName);

                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await model.Photo.CopyToAsync(stream);
                }

                System.IO.File.Move(path, newPath);

                User newUser = new User
                {
                    ID = Guid.NewGuid().ToString(),
                    Email = model.Email,
                    UserName = model.UserName,
                    PasswordHash = LiveGallery.Helpers.RijndaelForPassword.EncryptStringAES(model.Password, model.Email),
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    PhotoURL = Url.Content("~/images/" + newFileName),
                    Role = 0,
                    Country = model.Country
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
            else return BadRequest("Password or email is incorrect");
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
                    return BadRequest("User not found");
                }
                else
                {
                    GetUserResponseModel model = new GetUserResponseModel();
                    model.User = user;
                    model.Followers = _context.Subscribers.Where(x => x.SubscriberId == userID).Select(x => x.UserId).ToList();
                    model.Followings = _context.Subscribers.Where(x => x.UserId == userID).Select(x => x.SubscriberId).ToList();

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

            if (subs != null)
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

        [HttpGet]
        public IActionResult GetSubscriptions(string userID)
        {
            if (userID == null) return BadRequest("ID is null");

            var subscribers = _context.Subscribers.Where(x => x.UserId == userID).Select(x => x.SubscriberId);

            List<User> users = new List<User>();

            foreach (var item in subscribers)
            {
                var user = _context.Users.Where(x => x.ID == item).FirstOrDefault();
                if (user != null)
                {
                    users.Add(user);
                }
            }
            return Json(users);
        }

        [HttpGet]
        public IActionResult GetSubscribers(string userID)
        {
            if (userID == null) return BadRequest("ID is null");

            var followers = _context.Subscribers.Where(x => x.SubscriberId == userID).Select(x => x.UserId);

            List<User> users = new List<User>();

            foreach (var item in followers)
            {
                var user = _context.Users.Where(x => x.ID == item).FirstOrDefault();
                if (user != null)
                {
                    users.Add(user);
                }
            }

            return Json(users);
        }

        [HttpGet]
        public async Task<IActionResult> DeleteUser(string userID)
        {
            var user = _context.Users.Where(z => z.ID == userID).FirstOrDefault();

            if (user == null) return BadRequest("user not found");

            var commentsToDelete = _context.Comments.Where(x => x.UserId == userID);
            var followToDelete = _context.Subscribers.Where(x => x.UserId == userID || x.SubscriberId == userID);
            var postsToDelete = _context.Posts.Where(x => x.UserId == userID);
            var likesToDelete = _context.Like.Where(x => x.UserId == userID);

            _context.Like.RemoveRange(likesToDelete);
            _context.Comments.RemoveRange(commentsToDelete);
            _context.Subscribers.RemoveRange(followToDelete);
            _context.Posts.RemoveRange(postsToDelete);
            _context.Users.Remove(user);

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
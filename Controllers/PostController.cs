using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LiveGallery.ViewModels;
using LiveGallery.DataAccess;

namespace LiveGallery.Controllers
{
    public class PostController : Controller
    {
        ApplicationContext _context;

        public PostController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetUserPosts(string userID)
        {
            return Json(_context.Posts
                                    .Where(x => x.UserId == userID)
                                    .OrderBy(x => x.Date));
        }

        [HttpGet]
        public IActionResult GetAllPosts()
        {
            return Json(_context.Posts.OrderBy(x => x.Date));
        }

        [HttpPost]
        public async Task<ActionResult> CreatePost([FromBody]CreatePostViewModel model)
        {
            _context.Posts.Add(new LiveGallery.Models.Post()
            {
                Id = Guid.NewGuid().ToString(),
                UserId = model.UserID,
                Description = model.Description,
                ImageURL = model.ImageURL,
                Date = DateTime.Now,
                Likes = 0
            });
            await _context.SaveChangesAsync();
            return Json("added");
        }
    }
}
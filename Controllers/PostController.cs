using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LiveGallery.ViewModels;
using LiveGallery.DataAccess;
using LiveGallery.Models;

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
            _context.Posts.Add(new Post()
            {
                Id = Guid.NewGuid().ToString(),
                UserId = model.UserID,
                Description = model.Description,
                ImageURL = "empty URL", //TODO: Save the file and set here URL to file
                Date = DateTime.Now,
                Likes = new List<Like>()
            });
            await _context.SaveChangesAsync();
            return Json("added");
        }

        [HttpPost]
        public async Task<ActionResult> SetLike([FromBody]SetLikeViewModel model)
        {
            var post = _context.Posts.Where(x => x.Id == model.PostId).FirstOrDefault();
            if (post != null)
            {
                var like = post.Likes.Where(x => x.UserId == model.UserId).FirstOrDefault();
                if (like != null)
                    post.Likes.Remove(like);
                else post.Likes.Add(new Like()
                {
                    Id = Guid.NewGuid().ToString(),
                    UserId = model.UserId,
                    PostId = model.PostId
                });    

                await _context.SaveChangesAsync();

                return Json(post.Likes.Count);
            }
            else return Json("post not found");
        }
    }
}
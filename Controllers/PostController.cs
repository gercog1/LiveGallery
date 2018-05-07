using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LiveGallery.ViewModels;
using LiveGallery.DataAccess;
using LiveGallery.Models;
using System.IO;
using Microsoft.EntityFrameworkCore;

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
            var result  = _context.Posts
                                .Include(x => x.Likes)
                                .Where(x => x.UserId == userID)
                                .OrderBy(x => x.Date);

            foreach(var item in result)
            {
                item.Comments = _context.Comments.Where(x => x.PostId == item.Id).OrderBy(x => x.Date).ToList();
            }

            return Json(result);
        }

        [HttpGet]
        public IActionResult GetPost(string postId)
        {
            var post = _context.Posts.Include(x => x.Likes).Include(x => x.User).Where(x => x.Id == postId).FirstOrDefault();

            if(post != null) return Json(post);
            else return BadRequest("post not found");
        }

        [HttpGet]
        public IActionResult GetAllPosts()
        {
            return Json(_context.Posts
                .Include(x => x.Likes)
                .Include(x => x.Comments)
                .OrderBy(x => x.Date));
        }

        [HttpGet]
        public IActionResult GetPostsBySubscribers(string userId)
        {
            var subs = _context.Subscribers.Where(x => x.UserId == userId).ToList();

            List<Post> posts = new List<Post>();

            if (subs.Count > 0)
            {
                foreach (var item in subs)
                {
                    var post = _context.Posts
                                       .Include(x => x.Likes)
                                       .Where(x => x.UserId == item.SubscriberId)
                                       .OrderBy(x => x.Date);

                    foreach (var element in post)
                    {
                        element.Comments = _context.Comments.Where(x => x.PostId == item.Id).OrderBy(x => x.Date).ToList();
                    }

                    if (post != null) posts.AddRange(post);
                }
            }

            return Json(posts);
        }

        [HttpPost]
        public async Task<ActionResult> CreatePost([FromForm]CreatePostViewModel model)
        {
            if(model.File == null)
            {
                return BadRequest("file null");
            }
            
            if(!Directory.Exists(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images")))
            {
                Directory.CreateDirectory(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images"));
            }

            string ext = string.Empty;

            try
            {
                ext = model.File.FileName.Split(new char[] { '.' }, StringSplitOptions.RemoveEmptyEntries)[1];
            }
            catch(Exception)
            {
                return BadRequest("bad file");
            }

            string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", model.File.FileName);
            string newFileName = model.UserID + Guid.NewGuid().ToString() + "." + ext;
            string newPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", newFileName);

            using (var stream = new FileStream(path, FileMode.Create))
            {
                await model.File.CopyToAsync(stream);
            }

            System.IO.File.Move(path, newPath);
            
            _context.Posts.Add(new Post()
            {
                Id = Guid.NewGuid().ToString(),
                UserId = model.UserID,
                Description = model.Description,
                ImageURL = Url.Content("~/images/" + newFileName), 
                Date = DateTime.Now,
                Likes = new List<Like>(),
                Comments = new List<Comment>()
            });

            await _context.SaveChangesAsync();

            return Json("added");
        }
        
        [HttpPost]
        public async Task<ActionResult> SetLike([FromBody]SetLikeViewModel model)
        {
            var post = _context.Posts.Include(x => x.Likes).Where(x => x.Id == model.PostId).FirstOrDefault();
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
            else return BadRequest("post not found");
        }

        [HttpGet]
        public async Task<IActionResult> DeletePost(string postID)
        {
            var post = _context.Posts.Where(x => x.Id == postID).FirstOrDefault();

            if (post == null) return BadRequest("post not found");

            var commentsToDelete = _context.Comments.Where(x => x.PostId == postID);

            _context.Comments.RemoveRange(commentsToDelete);
            post.Likes.Clear();
            _context.Posts.Remove(post);

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
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

        public async Task<ActionResult> CreatePost(CreatePostViewModel model)
        {
            if (ModelState.IsValid)
            {
                _context.Posts.Add(new LiveGallery.Models.Post()
                {
                    Id = Guid.NewGuid().ToString(),
                    UserId = model.UserID,
                    Description = model.Description,
                    ImageURL = model.ImageURL
                });
                await _context.SaveChangesAsync();
                return Ok();
            }
            else return BadRequest();
        }
    }
}
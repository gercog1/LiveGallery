using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LiveGallery.ViewModels;
using LiveGallery.DataAccess;

namespace LiveGallery.Controllers
{
    public class CommentController : Controller
    {
        ApplicationContext _context;

        public CommentController(ApplicationContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public IActionResult GetCommentsForPost(string postID)
        {
            return Json(_context.Comments.Include(x=>x.UserId));
        }

        [HttpPost]
        public async Task<IActionResult> CreateComment([FromBody]CreateCommentViewModel model)
        {
            _context.Comments.Add(new Models.Comment(){
                Id = Guid.NewGuid().ToString(),
                UserId = model.UserId,
                PostId = model.PostId,
                Text = model.Text
            });
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
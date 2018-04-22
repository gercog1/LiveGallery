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
        public IActionResult GetCommentsForPost(Guid postID)
        {
            var list = _context.Comments.Where(x => x.PostId == postID).Include(x=>x.User).ToList();
            return Json(list);
        }

        [HttpPost]
        public async Task<IActionResult> CreateComment([FromBody]CreateCommentViewModel model)
        {
            _context.Comments.Add(new Models.Comment(){
                Id = Guid.NewGuid(),
                UserId = model.UserId,
                PostId = model.PostId,
                Text = model.Text,
                Date = DateTime.Now
            });
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
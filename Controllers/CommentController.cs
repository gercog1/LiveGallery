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
            var list = _context.Comments.Where(x => x.PostId == postID).Include(x => x.User).OrderBy(x => x.Date).ToList();
            return Json(list);
        }

        [HttpPost]
        public async Task<IActionResult> CreateComment([FromBody]CreateCommentViewModel model)
        {
            _context.Comments.Add(new Models.Comment(){
                Id = Guid.NewGuid().ToString(),
                UserId = model.UserId,
                PostId = model.PostId,
                Text = model.Text,
                Date = DateTime.Now
            });

            await _context.SaveChangesAsync();

            return Ok();
        }

        public async Task<IActionResult> DeleteComment(string commentId)
        {
            var comment = _context.Comments.Where(x => x.Id == commentId).FirstOrDefault();

            if (comment == null) return BadRequest("comment not found");

            _context.Comments.Remove(comment);

            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
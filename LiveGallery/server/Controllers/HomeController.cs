using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LiveGallery.DataAccess;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LiveGallery.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private ApplicationContext _context;

        public HomeController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetPosts()
        {
            return Ok(_context.Posts.Include(x => x.Comments).Include("Users").ToList());
        }
    }
}
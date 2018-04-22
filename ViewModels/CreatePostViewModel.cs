using Microsoft.AspNetCore.Http;
using System;

namespace LiveGallery.ViewModels
{
    public class CreatePostViewModel
    {        
        public string UserID { get; set; }
        public IFormFile File { get; set; }
        public string Description { get; set; }
    }
}
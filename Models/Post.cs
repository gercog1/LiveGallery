using System;
using System.Collections.Generic;

namespace LiveGallery.Models
{
    public class Post
    {
        public string Id { get; set; }
        public string ImageURL { get; set; }
        public string Description { get; set; }
        public ICollection<Like> Likes { get; set; } = new List<Like>();
        public DateTime Date {get;set;}
        public string UserId { get; set; }
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}
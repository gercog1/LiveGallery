using System;
using System.Collections.Generic;

namespace LiveGallery.Models
{
    public class Post
    {
        public Guid Id { get; set; }
        public string ImageURL { get; set; }
        public string Description { get; set; }
        public int Likes { get; set; }
        public Guid? UserId { get; set; }
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}

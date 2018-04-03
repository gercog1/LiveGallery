using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace LiveGallery.Models
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhotoURL { get; set; }
        public ICollection<Post> Posts { get; set; } = new List<Post>();
        public ICollection<Comment> Comments { get; set; } = new List<Comment>();
    }
}
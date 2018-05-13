using System;
using System.Collections.Generic;

namespace LiveGallery.Models
{
    public class User
    {
        public string ID { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Country { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhotoURL { get; set; }
        public int Role { get; set; }
        public ICollection<Post> Posts { get; set; } = new List<Post>();
    }
}
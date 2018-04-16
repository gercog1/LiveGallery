using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LiveGallery.Models
{
    public class Comment
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public string PostId { get; set; }
        public string Text { get; set; }
        public DateTime Date {get;set;}
    }
}
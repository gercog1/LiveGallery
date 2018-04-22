using System;

namespace LiveGallery.Models
{
    public class Comment
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public User User { get; set; }
        public Guid PostId { get; set; }
        public string Text { get; set; }
        public DateTime Date {get;set;}
    }
}
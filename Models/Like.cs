using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LiveGallery.Models
{
    public class Like
    {
        public string Id { get; set; }
        public string PostId { get; set; }
        public string UserId { get; set; }
    }
}

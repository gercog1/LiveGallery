using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LiveGallery.ViewModels
{
    public class CreateCommentViewModel
    {        
        public Guid UserId { get; set; }
        public Guid PostId { get; set; }
        public string Text { get; set; }
    }
}
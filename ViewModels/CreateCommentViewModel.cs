using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LiveGallery.ViewModels
{
    public class CreateCommentViewModel
    {        
        public string UserId { get; set; }
        public string PostId { get; set; }
        public string Text { get; set; }
    }
}
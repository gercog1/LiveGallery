using System.Collections.Generic;
using LiveGallery.Models;
namespace LiveGallery.ViewModels
{
    public class GetUserResponseModel
    {
        public User User { get; set; }
        public List<string> Followers { get; set; }
        public List<string> Followings { get; set; }
    }
}

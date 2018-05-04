using System.Collections.Generic;
using LiveGallery.Models;
namespace LiveGallery.ViewModels
{
    public class GetUserResponseModel
    {
        public User User { get; set; }
        public int SubscribersCount { get; set; }
        public int FollowersCount { get; set; }
        public int CommentsCount { get; set; }
    }
}

using AutoMapper;
using LiveGallery.Models;
using LiveGallery.ViewModels;

namespace WebApi.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, RegisterViewModel>();
            CreateMap<RegisterViewModel, User>();
        }
    }
}
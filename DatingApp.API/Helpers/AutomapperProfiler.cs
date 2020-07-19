using System.Linq;
using AutoMapper;
using DatingApp.API.DTOs;
using DatingApp.API.Models;

namespace DatingApp.API.Helpers
{
    public class AutomapperProfiler : Profile
    {
        public AutomapperProfiler()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, 
                    opt => {
                         opt.MapFrom(src => 
                             src.Photos.FirstOrDefault(p => p.IsMain).Url);
                             })
                .ForMember(dest => dest.Age,
                    opt => {
                        opt.MapFrom(src => src.DateOfBirth.CalculateAge());
                    });
            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, 
                    opt => {
                         opt.MapFrom(src => 
                             src.Photos.FirstOrDefault(p => p.IsMain).Url);
                             })
                .ForMember(dest => dest.Age,
                    opt => {
                        opt.MapFrom(src => src.DateOfBirth.CalculateAge());
                    });
            CreateMap<Photo, PhotoForDetailsDto>();
        }
    }
}
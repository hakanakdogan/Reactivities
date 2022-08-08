using Application.Activities;
using Application.Photos;
using AutoMapper;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, Activity>();
            CreateMap<Activity, ActivityDto>()
                .ForMember(d => d.HostUserName, o => o.MapFrom(s => s.Attendees
                .FirstOrDefault(x => x.IsHost).AppUser.UserName));
            CreateMap<ActivityAttendee,AttendeeDto>()
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.Bio, o => o.MapFrom(s => s.AppUser.Bio))
                .ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url));

            CreateMap<Photo, PhotoDto>();

            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.Image, o => o.MapFrom(s=>s.Photos.FirstOrDefault(x=>x.IsMain).Url)); 
        }
    }
}

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
        }
    }
}

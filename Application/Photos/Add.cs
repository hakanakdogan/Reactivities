using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Photos
{
    public class Add
    {
        public class Command : IRequest<Result<PhotoDto>>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<PhotoDto>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly IUserAccessor _userAccessor;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor, IMapper mapper)
            {
                _context = context;
                _photoAccessor = photoAccessor;
                _userAccessor = userAccessor;
                _mapper = mapper;
            }
            public async Task<Result<PhotoDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(p => p.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());

                if (user == null) return null;

                var photoUploadResult = await _photoAccessor.AddPhoto(request.File);

                var photo = new Photo
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };

                if (!user.Photos.Any(x => x.IsMain))
                {
                    photo.IsMain = true;
                }

                user.Photos.Add(photo);

                var result = await _context.SaveChangesAsync() > 0;
                
                var photoToReturn = _mapper.Map<PhotoDto>(photo);

                if(result) return Result<PhotoDto>.Success(photoToReturn);

                return Result<PhotoDto>.Failure("Problem adding photo");
            }
        }


    }
}

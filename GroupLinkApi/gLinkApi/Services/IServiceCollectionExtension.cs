using Entities;
using GroupLinkApi.Database.Repositories.ClassScheduleRepository;
using GroupLinkApi.Database.Repositories.CourseRepository;
using GroupLinkApi.Database.Repositories.LectureRepository;
using GroupLinkApi.Database.Repositories.UserCourseRepository;
using GroupLinkApi.Database.Repositories.UserRepository;
using GroupLinkApi.Database.Repositories;
using GroupLinkApi.Interfaces;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Server.IISIntegration;
using Microsoft.Extensions.DependencyInjection;
using System.Configuration;

namespace GroupLinkApi.Services
{
    public static class IServiceCollectionExtension
    {
        public static IServiceCollection ConfigureServices(this IServiceCollection services)
        {
            
            // SERVICES
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ICourseService, CourseService>();

            services.AddScoped<INotificationService, NotificationService>();

            // REPOSITORIES
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ICourseRepository, CourseRepository>();
            services.AddScoped<ILectureRepository, LectureRepository>();
            services.AddScoped<IClassScheduleRepository, ClassScheduleRepository>(); 
            services.AddScoped<IUserCourseRepository, UserCourseRepository>();
            services.AddScoped<INotificationRepository, NotificationRepository>();

            return services;
        }
    }
}

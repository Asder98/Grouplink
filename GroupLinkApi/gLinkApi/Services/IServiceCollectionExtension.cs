using GroupLinkApi.Database.Repositories;
using GroupLinkApi.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace GroupLinkApi.Services
{
    public static class IServiceCollectionExtension
    {
        public static IServiceCollection ConfigureServices(this IServiceCollection services)
        {
            
            // SERVICES
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<INotificationService, NotificationService>();

            // REPOSITORIES
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<INotificationRepository, NotificationRepository>();

            return services;
        }
    }
}

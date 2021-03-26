using GroupLinkApi.Database.Repositories.UserRepository;
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

            // REPOSITORIES
            services.AddScoped<IUserRepository, UserRepository>();

            return services;
        }
    }
}

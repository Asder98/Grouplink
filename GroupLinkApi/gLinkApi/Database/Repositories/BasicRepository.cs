using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace GroupLinkApi.Database.Repositories
{
    public class BasicRepository<T> : IBasicRepository<T>
    {
        protected ILogger _logger;
        protected readonly GroupLinkContext _context;

        public BasicRepository(GroupLinkContext context, ILogger<BasicRepository<T>> logger)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<bool> DatabaseCorrectness()
        {
            try
            {
                await _context.Database.EnsureCreatedAsync();
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return false;
            }
        }

        public async Task<bool> TrySaveChangesAsync()
        {
            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return false;
            }
        }
        public async Task<bool> Add(T entity)
        {
            if (DatabaseCorrectness().Result)
            {
                try
                {
                    await _context.AddAsync(entity);
                    if (TrySaveChangesAsync().Result)
                        return true;
                    else
                        return false;
                }
                catch (Exception e)
                {
                    _logger.LogError(e.Message);
                    return false;
                }
            }
            else return false;
        }

        public bool Update(T entity)
        {
            if (DatabaseCorrectness().Result)
            {
                try
                {
                    _context.Update(entity);
                    if (TrySaveChangesAsync().Result) return true;
                    else return false;
                }
                catch (Exception e)
                {
                    _logger.LogError(e.Message);
                    return false;
                }
            }
            else return false;
        }
    }
}

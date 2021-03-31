using Entities;
using Microsoft.EntityFrameworkCore;

namespace GroupLinkApi.Database
{
    public class GroupLinkContext : DbContext
    {
        public GroupLinkContext()
        {
        }
        
        public GroupLinkContext(DbContextOptions<GroupLinkContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Courses> Courses { get; set; }
        public virtual DbSet<Lecturers> Lecturers { get; set; }
        public virtual DbSet<Notifications> Notifications { get; set; }
        public virtual DbSet<Users> Users { get; set; }
        public virtual DbSet<UsersCourses> UsersCourses { get; set; }
        public virtual DbSet<ClassSchedules> ClassSchedules { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }
    }
}

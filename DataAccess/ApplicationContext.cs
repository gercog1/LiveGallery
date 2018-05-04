using Microsoft.EntityFrameworkCore;
using LiveGallery.Models;

namespace LiveGallery.DataAccess
{
    public class ApplicationContext: DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Subscribe> Subscribers { get; set; }
        public DbSet<Like> Like { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        { }
    }
}
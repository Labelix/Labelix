using Labelix.Logic.Entities.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Labelix.Logic.DataContext.Db
{
    partial class LabelixDbContext : GenericDbContext
    {

        public DbSet<Image> ImageSet { get; set; }
        public DbSet<Label> LabelSet { get; set; }
        /*
        protected DbSet<Project> ProjectSet
        {
            get;
            set;
        }
        */
        public override DbSet<E> Set<I, E>()
        {
            DbSet<E> result = null;
            if (typeof(I) == typeof(Labelix.Contracts.Persistence.IImage))
            {
                result = ImageSet as DbSet<E>;
            }
            else if (typeof(I) == typeof(Labelix.Contracts.Persistence.ILabel))
            {
                result = LabelSet as DbSet<E>;
            }
            /*
            else if (typeof(I) == typeof(Labelix.Contracts.Persistence.IProject))
            {
                result = ProjectSet as DbSet<E>;
            }
            */
            return result;
        }


        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder.UseNpgsql("Host=localhost;Port=5422;Database=postgres;Username=postgres;Password=mysecretpassword");


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            BeforeConfiguring(optionsBuilder);
            optionsBuilder.UseNpgsql("Host=localhost;Port=5422;Database=postgres;Username=postgres;Password=mysecretpassword");
            AfterConfiguring(optionsBuilder);
        }
        partial void BeforeConfiguring(DbContextOptionsBuilder optionsBuilder);
        partial void AfterConfiguring(DbContextOptionsBuilder optionsBuilder);

    }
}

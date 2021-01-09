using Labelix.Logic.Entities.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Labelix.Logic.DataContext.Db
{
    partial class LabelixDbContext : GenericDbContext
    {

        protected DbSet<Image> ImageSet { get; set; }
        protected DbSet<Label> LabelSet { get; set; }

        protected DbSet<Project> ProjectSet { get; set; }

        protected DbSet<AIModelConfig> AIConfigSet { get; set; }
        protected DbSet<Project_AIModelConfig> Project_AIConfigSet { get; set; }
        protected DbSet<User> UserSet { get; set; }
        protected DbSet<Project_User> Project_UserSet { get; set; }

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

            else if (typeof(I) == typeof(Labelix.Contracts.Persistence.IProject))
            {
                result = ProjectSet as DbSet<E>;
            }
            else if (typeof(I) == typeof(Labelix.Contracts.Persistence.IAIModelConfig))
            {
                result = AIConfigSet as DbSet<E>;
            }
            else if (typeof(I) == typeof(Labelix.Contracts.Persistence.IProject_AIModelConfig))
            {
                result = Project_AIConfigSet as DbSet<E>;
            }
            else if (typeof(I) == typeof(Labelix.Contracts.Persistence.IUser))
            {
                result = UserSet as DbSet<E>;
            }
            else if (typeof(I) == typeof(Labelix.Contracts.Persistence.IProject_User))
            {
                result = Project_UserSet as DbSet<E>;
            }


            return result;
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            BeforeConfiguring(optionsBuilder);
            string connectionString = "Host=labelix_postgresdb_1;Port=5432;Database=postgres;Username=postgres;Password=sicheres123Passwort";
#if DEBUG
            connectionString = "Host = localhost; Port = 5422; Database = postgres; Username = postgres; Password = sicheres123Passwort";
#endif
            optionsBuilder.UseNpgsql(connectionString);
            AfterConfiguring(optionsBuilder);
        }
        partial void BeforeConfiguring(DbContextOptionsBuilder optionsBuilder);
        partial void AfterConfiguring(DbContextOptionsBuilder optionsBuilder);
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            ConfigureEntityType(modelBuilder.Entity<Image>());
            ConfigureEntityType(modelBuilder.Entity<Label>());
            ConfigureEntityType(modelBuilder.Entity<Project>());
            ConfigureEntityType(modelBuilder.Entity<AIModelConfig>());
            ConfigureEntityType(modelBuilder.Entity<Project_AIModelConfig>());
            ConfigureEntityType(modelBuilder.Entity<User>());
            ConfigureEntityType(modelBuilder.Entity<Project_User>());
        }

        private void ConfigureEntityType(EntityTypeBuilder<Image> entityTypeBuilder)
        {
            entityTypeBuilder.ToTable("images");
        }
        private void ConfigureEntityType(EntityTypeBuilder<Label> entityTypeBuilder)
        {
            entityTypeBuilder.ToTable("labels");
        }
        private void ConfigureEntityType(EntityTypeBuilder<Project> entityTypeBuilder)
        {
            entityTypeBuilder.ToTable("projects");
            entityTypeBuilder
                .HasMany<Project_AIModelConfig>(e => e.AIConfigs)
                .WithOne()
                .HasForeignKey(i => i.ProjectKey);

            
        }
        private void ConfigureEntityType(EntityTypeBuilder<AIModelConfig> entityTypeBuilder)
        {
            entityTypeBuilder.ToTable("ai_model_configs");
            entityTypeBuilder
                .HasMany<Project_AIModelConfig>(e => e.Projects)
                .WithOne()
                .HasForeignKey(i => i.AIConfigKey);
        }

        private void ConfigureEntityType(EntityTypeBuilder<Project_AIModelConfig> entityTypeBuilder)
        {
            entityTypeBuilder.ToTable("project_ai_model_configs");
        }

        private void ConfigureEntityType(EntityTypeBuilder<User> entityTypeBuilder)
        {
            entityTypeBuilder.ToTable("users");
        }
        private void ConfigureEntityType(EntityTypeBuilder<Project_User> entityTypeBuilder)
        {
            entityTypeBuilder.ToTable("project_users");
        }
    }
}

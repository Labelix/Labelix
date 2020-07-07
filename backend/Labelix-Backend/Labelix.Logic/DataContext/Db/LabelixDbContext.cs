using System;
using System.Collections.Generic;
using System.Text;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Labelix.Logic.Entities.Persistence;

namespace Labelix.Logic.DataContext.Db
{
    partial class LabelixDbContext : DbContext
    {
        public DbSet<Project> Projects { get; set; }

        //private static string ConnectionString { get; set; } = "Data Source=(localdb)\\MSSQLLocalDb;Database=LabelixDB;Integrated Security=True;";


        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    base.OnConfiguring(optionsBuilder);
        //    BeforeConfiguring(optionsBuilder);
        //    optionsBuilder.UseSqlServer(ConnectionString);
        //    AfterConfiguring(optionsBuilder);
        //}
        //partial void BeforeConfiguring(DbContextOptionsBuilder optionsBuilder);
        //partial void AfterConfiguring(DbContextOptionsBuilder optionsBuilder);



        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql("Host=localhost;Port=5422;Database=postgres;Username=postgres;Password=mysecretpassword");
    }
}

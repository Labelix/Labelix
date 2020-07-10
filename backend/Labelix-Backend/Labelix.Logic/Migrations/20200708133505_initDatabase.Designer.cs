﻿// <auto-generated />
using System;
using Labelix.Logic.DataContext.Db;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Labelix.Logic.Migrations
{
    [DbContext(typeof(LabelixDbContext))]
    [Migration("20200708133505_initDatabase")]
    partial class initDatabase
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("Labelix.Logic.Entities.Persistence.Image", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("ImagePath")
                        .HasColumnType("text");

                    b.Property<string>("LabeledPath")
                        .HasColumnType("text");

                    b.Property<int>("ProjectImageId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ProjectImageId");

                    b.ToTable("images");
                });

            modelBuilder.Entity("Labelix.Logic.Entities.Persistence.Label", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Color")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<int>("ProjectLabelId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("ProjectLabelId");

                    b.ToTable("LabelSet");
                });

            modelBuilder.Entity("Labelix.Logic.Entities.Persistence.Project", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<bool>("FinishedAnnotation")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("ProjectSet");
                });

            modelBuilder.Entity("Labelix.Logic.Entities.Persistence.Image", b =>
                {
                    b.HasOne("Labelix.Logic.Entities.Persistence.Project", null)
                        .WithMany("ListOfImages")
                        .HasForeignKey("ProjectImageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Labelix.Logic.Entities.Persistence.Label", b =>
                {
                    b.HasOne("Labelix.Logic.Entities.Persistence.Project", "Project")
                        .WithMany("ListOfLabel")
                        .HasForeignKey("ProjectLabelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}

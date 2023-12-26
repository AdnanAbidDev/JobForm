using JobFormAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace JobFormAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Job> Jobs { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<Field> Fields { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed data for Job
            modelBuilder.Entity<Job>().HasData(
                new Job { JobId = 1, JobTitle = "Handyman Services", StartDate = new DateTime(2023, 1, 1, 8, 0, 0), ExpiryDate = new DateTime(2023, 1, 1, 18, 0, 0), Duration = 10 },
                new Job { JobId = 2, JobTitle = "Certified Plumber", StartDate = new DateTime(2023, 1, 2, 9, 0, 0), ExpiryDate = new DateTime(2023, 1, 2, 17, 0, 0), Duration = 8 }
            );

            // Seed data for Section
            modelBuilder.Entity<Section>().HasData(
                new Section { SectionId = 1, JobId = 1, SectionName = "Details" },
                new Section { SectionId = 2, JobId = 1, SectionName = "Additional Info" },
                new Section { SectionId = 3, JobId = 2, SectionName = "Requirements" }
            );

            // Seed data for Field
            modelBuilder.Entity<Field>().HasData(
                new Field { FieldId = 1, SectionId = 1, FieldName = "Description", FieldValue = "General repair works" },
                new Field { FieldId = 2, SectionId = 1, FieldName = "Time Estimate", FieldValue = "2 hours" },
                new Field { FieldId = 3, SectionId = 2, FieldName = "Customer Notes", FieldValue = "Be careful with the garden" },
                new Field { FieldId = 4, SectionId = 2, FieldName = "Special Requirements", FieldValue = "Bring extra tools" },
                new Field { FieldId = 5, SectionId = 3, FieldName = "Tools Needed", FieldValue = "Wrench, Pliers" },
                new Field { FieldId = 6, SectionId = 3, FieldName = "Materials", FieldValue = "PVC pipes, Sealant" }
            );
        }

    }
}

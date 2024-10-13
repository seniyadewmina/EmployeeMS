using EmployeeManagement.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace EmployeeManagement.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        modelBuilder.Entity<Employee>()
                .HasMany(e => e.Departments)
                .WithMany(e => e.Employees)
                .UsingEntity(
                    "EmployeeDepartment",
                    l => l.HasOne(typeof(Department)).WithMany().HasForeignKey("DepartmentsId").HasPrincipalKey(nameof(Department.Id)),
                    r => r.HasOne(typeof(Employee)).WithMany().HasForeignKey("EmployeeId").HasPrincipalKey(nameof(Employee.Id)),
                    j => j.HasKey("EmployeeId", "DepartmentsId"));
        }
    }
}

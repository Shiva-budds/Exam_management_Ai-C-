using System;
using Microsoft.EntityFrameworkCore;

namespace Exam_Management_With_AI.Model;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        
    }
    public DbSet<UserModel> Users {get; set;}
    public DbSet<StudentTeacherModel> StudentTeacher {get; set;}
}

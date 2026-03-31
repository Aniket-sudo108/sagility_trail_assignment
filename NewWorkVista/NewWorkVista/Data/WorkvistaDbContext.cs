using Microsoft.EntityFrameworkCore;
using Workvista.Models;

namespace Workvista.Data
{
    public class WorkvistaDbContext : DbContext
    {
        public WorkvistaDbContext(DbContextOptions<WorkvistaDbContext> options) : base(options) { }

        public DbSet<Team> Teams { get; set; }
        public DbSet<TeamMember> TeamMembers { get; set; }
        public DbSet<ActivityCategory> ActivityCategories { get; set; }
        public DbSet<ActivityLog> ActivityLogs { get; set; }
        public DbSet<TimeEntry> TimeEntries { get; set; }
        public DbSet<ProductivityScore> ProductivityScores { get; set; }
        public DbSet<MemberStatus> MemberStatus { get; set; }
        public DbSet<KpiMaster> KpiMaster { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Unique constraints
            modelBuilder.Entity<TeamMember>()
                .HasIndex(t => t.EmployeeCode).IsUnique();
            modelBuilder.Entity<TeamMember>()
                .HasIndex(t => t.Email).IsUnique();
            modelBuilder.Entity<ActivityCategory>()
                .HasIndex(a => a.Name).IsUnique();
            modelBuilder.Entity<KpiMaster>()
                .HasIndex(k => k.ColumnName).IsUnique();

            // Relationships
            modelBuilder.Entity<TeamMember>()
                .HasOne(t => t.Manager)
                .WithMany()
                .HasForeignKey(t => t.ManagerId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TeamMember>()
                .HasOne(t => t.Team)
                .WithMany(t => t.Members)
                .HasForeignKey(t => t.TeamId);
        }
    }
}
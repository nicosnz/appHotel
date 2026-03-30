using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):base(options){}

        public DbSet<Reserva> Reservas {get;set;}
        public DbSet<Habitacion> Habitaciones {get;set;}
        public DbSet<Huesped> Huespedes {get;set;}


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Huesped>(entity =>
            {
                entity.ToTable("Huespedes");
                entity.HasKey(h => h.Id);
                entity.Property(h => h.Nombre).IsRequired().HasMaxLength(50);
                entity.Property(h => h.Apellido).IsRequired().HasMaxLength(50);
                entity.Property(h => h.Documento).IsRequired().HasMaxLength(7);
                entity.Property(h => h.Genero);
                modelBuilder.Entity<Huesped>().HasMany(h => h.Reservas).WithMany(r => r.Huespedes).UsingEntity(n => n.ToTable("Huespes_Reservas"));
            });

            modelBuilder.Entity<Habitacion>(entity =>
            {
                entity.ToTable("Habitaciones");
                entity.HasKey(h => h.Id);
                entity.Property(h => h.TipoHabitacion).HasConversion<string>();
                entity.Property(h => h.NumHabitacion).IsRequired().HasMaxLength(3);
                entity.Property(h => h.CapacidadPersonas).IsRequired();
                entity.Property(h => h.Precio).IsRequired();
                entity.Property(h => h.TipoCama).HasConversion<string>();
                entity.Property(h => h.Piso).IsRequired();
                entity.Property(h => h.EstadoHabitacion).HasConversion<string>();
            });

            modelBuilder.Entity<Reserva>(entity =>
            {
                entity.ToTable("Reservas");
                entity.HasKey(r => r.Id);
                entity.Property(r => r.EstadoReserva).HasConversion<string>();
                entity.Property(r => r.Mora);
                entity.Property(r => r.PrecioTotal);
                entity.HasOne(r => r.Habitacion).WithMany(h => h.Reservas).HasForeignKey(r => r.HabitacionId);

            });

        }
    }
}
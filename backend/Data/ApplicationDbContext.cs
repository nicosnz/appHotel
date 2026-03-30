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

            modelBuilder.Entity<Habitacion>().HasData(
                new Habitacion
                {
                    Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                    NumHabitacion = "001",
                    CapacidadPersonas = 2,
                    Precio = 150,
                    Piso = 1,
                    TipoHabitacion = TipoHabitacion.SIMPLE,
                    TipoCama = TipoCama.INDIVIDUAL,
                    EstadoHabitacion = EstadoHabitacion.LIBRE
                },
                new Habitacion
                {
                    Id = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                    NumHabitacion = "003",
                    CapacidadPersonas = 3,
                    Precio = 200,
                    Piso = 1,
                    TipoHabitacion = TipoHabitacion.DOBLE_INDIVIDUAL,
                    TipoCama = TipoCama.INDIVIDUAL,
                    EstadoHabitacion = EstadoHabitacion.LIBRE
                },
                new Habitacion
                {
                    Id = Guid.Parse("33333333-3333-3333-3333-333333333333"),
                    NumHabitacion = "004",
                    CapacidadPersonas = 2,
                    Precio = 160,
                    Piso = 1,
                    TipoHabitacion = TipoHabitacion.SIMPLE,
                    TipoCama = TipoCama.INDIVIDUAL,
                    EstadoHabitacion = EstadoHabitacion.LIBRE
                },
                new Habitacion
                {
                    Id = Guid.Parse("44444444-4444-4444-4444-444444444444"),
                    NumHabitacion = "005",
                    CapacidadPersonas = 4,
                    Precio = 300,
                    Piso = 1,
                    TipoHabitacion = TipoHabitacion.SUITE,
                    TipoCama = TipoCama.MATRIMONIAL,
                    EstadoHabitacion = EstadoHabitacion.LIBRE
                },
                new Habitacion
                {
                    Id = Guid.Parse("55555555-5555-5555-5555-555555555555"),
                    NumHabitacion = "006",
                    CapacidadPersonas = 2,
                    Precio = 180,
                    Piso = 1,
                    TipoHabitacion = TipoHabitacion.SIMPLE,
                    TipoCama = TipoCama.INDIVIDUAL,
                    EstadoHabitacion = EstadoHabitacion.LIBRE
                },
                new Habitacion
                {
                    Id = Guid.Parse("66666666-6666-6666-6666-666666666666"),
                    NumHabitacion = "007",
                    CapacidadPersonas = 3,
                    Precio = 220,
                    Piso = 2,
                    TipoHabitacion = TipoHabitacion.DOBLE_INDIVIDUAL,
                    TipoCama = TipoCama.INDIVIDUAL,
                    EstadoHabitacion = EstadoHabitacion.LIBRE
                },
                new Habitacion
                {
                    Id = Guid.Parse("77777777-7777-7777-7777-777777777777"),
                    NumHabitacion = "008",
                    CapacidadPersonas = 2,
                    Precio = 250,
                    Piso = 2,
                    TipoHabitacion = TipoHabitacion.DOBLE_MATRIMONIAL,
                    TipoCama = TipoCama.MATRIMONIAL,
                    EstadoHabitacion = EstadoHabitacion.LIBRE
                },
                new Habitacion
                {
                    Id = Guid.Parse("88888888-8888-8888-8888-888888888888"),
                    NumHabitacion = "009",
                    CapacidadPersonas = 4,
                    Precio = 350,
                    Piso = 2,
                    TipoHabitacion = TipoHabitacion.SUITE,
                    TipoCama = TipoCama.MATRIMONIAL,
                    EstadoHabitacion = EstadoHabitacion.LIBRE
                },
                new Habitacion
                {
                    Id = Guid.Parse("99999999-9999-9999-9999-999999999999"),
                    NumHabitacion = "010",
                    CapacidadPersonas = 2,
                    Precio = 190,
                    Piso = 3,
                    TipoHabitacion = TipoHabitacion.SIMPLE,
                    TipoCama = TipoCama.INDIVIDUAL,
                    EstadoHabitacion = EstadoHabitacion.LIBRE
                },
                new Habitacion
                {
                    Id = Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"),
                    NumHabitacion = "011",
                    CapacidadPersonas = 3,
                    Precio = 230,
                    Piso = 3,
                    TipoHabitacion = TipoHabitacion.DOBLE_INDIVIDUAL,
                    TipoCama = TipoCama.INDIVIDUAL,
                    EstadoHabitacion = EstadoHabitacion.LIBRE
                },
                new Habitacion
                {
                    Id = Guid.Parse("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"),
                    NumHabitacion = "012",
                    CapacidadPersonas = 2,
                    Precio = 260,
                    Piso = 3,
                    TipoHabitacion = TipoHabitacion.DOBLE_MATRIMONIAL,
                    TipoCama = TipoCama.MATRIMONIAL,
                    EstadoHabitacion = EstadoHabitacion.LIBRE
                },
                new Habitacion
                {
                    Id = Guid.Parse("cccccccc-cccc-cccc-cccc-cccccccccccc"),
                    NumHabitacion = "013",
                    CapacidadPersonas = 5,
                    Precio = 400,
                    Piso = 3,
                    TipoHabitacion = TipoHabitacion.DOBLE_MATRIMONIAL,
                    TipoCama = TipoCama.MATRIMONIAL,
                    EstadoHabitacion = EstadoHabitacion.LIBRE
                }
            );

        }
    }
}
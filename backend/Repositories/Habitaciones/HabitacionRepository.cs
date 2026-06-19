using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.Habitaciones
{
    public class HabitacionRepository : IHabitacionRepository
    {

        private readonly ApplicationDbContext applicationDbContext;

        public HabitacionRepository(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }

        public async Task<List<Habitacion>> GetAll()
        {
            var habitaciones = await applicationDbContext.Habitaciones.ToListAsync();
            return habitaciones;
        }

        public async Task<Habitacion> GetHabitacionById(Guid Id)
        {
            var habitacion = await applicationDbContext.Habitaciones.FirstOrDefaultAsync(h => h.Id == Id);
            return habitacion;
        }

        public async Task<List<Habitacion>> GetHabitacionesEstado(string EstadoHabitacion)
        {
            var estadoEnum = Enum.Parse<EstadoHabitacion>(EstadoHabitacion);

            var habitaciones = await applicationDbContext.Habitaciones.Where(h => h.EstadoHabitacion == estadoEnum).ToListAsync();
            return habitaciones;
        }

        public async Task<List<Habitacion>> GetHabitacionesTipo(string TipoHabitacion)
        {
            var tipoEnum = Enum.Parse<TipoHabitacion>(TipoHabitacion);

            var habitaciones = await applicationDbContext.Habitaciones.Where(h => h.TipoHabitacion == tipoEnum).ToListAsync();
            return habitaciones;
        }

        public async Task UpdateEstadoHabitacion(Guid Id,string estadoNuevo)
        {
            var estadoEnum = Enum.Parse<EstadoHabitacion>(estadoNuevo);

            var habitacion = await GetHabitacionById(Id);
            habitacion.EstadoHabitacion = estadoEnum;
            await applicationDbContext.SaveChangesAsync();
        }
        public async Task<List<Habitacion>> GetHabitacionesDisponibles(DateOnly fechaInicio, DateOnly fechaFin)
        {
            var habitaciones = await applicationDbContext.Habitaciones
                .Include(h => h.Reservas)
                .Where(h => !h.Reservas.Any(r =>
                    r.FechaCheckInEsperado < fechaFin &&
                    r.FechaCheckOutEsperado > fechaInicio
                ))
                .ToListAsync();

            return habitaciones;
        }
        public async Task<bool> EstaDisponible(
            Guid habitacionId,
            DateOnly fechaInicio,
            DateOnly fechaFin)
        {
            return !await applicationDbContext.Reservas
                .AnyAsync(r =>
                    r.HabitacionId == habitacionId &&
                    r.FechaCheckInEsperado < fechaFin &&
                    r.FechaCheckOutEsperado > fechaInicio
                );
        }
    }
}
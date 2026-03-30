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
    }
}
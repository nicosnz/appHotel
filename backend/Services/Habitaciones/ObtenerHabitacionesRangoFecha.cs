using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Repositories.Habitaciones;

namespace backend.Services.Habitaciones
{
    public class ObtenerHabitacionesRangoFecha
    {
        private readonly IHabitacionRepository habitacionRepository;

        public ObtenerHabitacionesRangoFecha(IHabitacionRepository habitacionRepository)
        {
            this.habitacionRepository = habitacionRepository;
        }

        public Task<List<Habitacion>> HabitacionesDisponiblesPorFecha(DateOnly fechaInicio, DateOnly fechaFin)
        {
            return habitacionRepository.GetHabitacionesDisponibles(fechaInicio,fechaFin);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Repositories.Habitaciones;

namespace backend.Services.Habitaciones
{
    public class ObtenerHabitacionesTipo
    {
        private readonly IHabitacionRepository habitacionRepository;

        public ObtenerHabitacionesTipo(IHabitacionRepository habitacionRepository)
        {
            this.habitacionRepository = habitacionRepository;
        }

        public async Task<List<Habitacion>> GetHabitacionesTipo(string tipoHabitacion)
        {
            var habitaciones = await this.habitacionRepository.GetHabitacionesTipo(tipoHabitacion);
            return habitaciones;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Repositories.Habitaciones;

namespace backend.Services.Habitaciones
{
    public class ObtenerHabitaciones
    {
        private readonly IHabitacionRepository habitacionRepository;

        public ObtenerHabitaciones(IHabitacionRepository habitacionRepository)
        {
            this.habitacionRepository = habitacionRepository;
        }

        public async Task<List<Habitacion>> GetHabitaciones()
        {
            var habitaciones = await this.habitacionRepository.GetAll();
            return habitaciones;
        }
    }
}
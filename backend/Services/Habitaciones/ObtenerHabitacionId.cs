using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Repositories.Habitaciones;

namespace backend.Services.Habitaciones
{
    public class ObtenerHabitacionId
    {
        private readonly IHabitacionRepository habitacionRepository;

        public ObtenerHabitacionId(IHabitacionRepository habitacionRepository)
        {
            this.habitacionRepository = habitacionRepository;
        }

        public async Task<Habitacion> GetHabitacionId(Guid Id)
        {
            var habitacion = await this.habitacionRepository.GetHabitacionById(Id);
            return habitacion;
        }
    }
}
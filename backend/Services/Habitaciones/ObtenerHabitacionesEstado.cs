using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Repositories.Habitaciones;

namespace backend.Services.Habitaciones
{
    public class ObtenerHabitacionesEstado
    {
        private readonly IHabitacionRepository habitacionRepository;

        public ObtenerHabitacionesEstado(IHabitacionRepository habitacionRepository)
        {
            this.habitacionRepository = habitacionRepository;
        }

        public async Task<List<Habitacion>> GetHabitacionesEstado(string estadoHabitacion)
        {
            var habitacionesEstado = await this.habitacionRepository.GetHabitacionesEstado(estadoHabitacion);
            return habitacionesEstado;
        }
    }
}
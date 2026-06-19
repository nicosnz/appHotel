using System;
using System.Threading.Tasks;
using backend.Repositories.Habitaciones;

namespace backend.Services.Reservas
{
    public class ValidarDisponibilidad
    {
        public static async Task ValidarHabitacionDisponible(
            IHabitacionRepository habitacionRepository,
            Guid habitacionId,
            DateOnly fechaCheckIn,
            DateOnly fechaCheckOut)
        {
            var disponible = await habitacionRepository.EstaDisponible(habitacionId, fechaCheckIn, fechaCheckOut);

            if (!disponible)
            {
                throw new InvalidOperationException("La habitación no está disponible en esas fechas.");
            }
        }
    }
}

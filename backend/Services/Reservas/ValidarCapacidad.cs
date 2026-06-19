using System;
using backend.Dtos.Reservas;
using backend.Models;

namespace backend.Services.Reservas
{
    public class ValidarCapacidad
    {
        public static void ValidarCantidadHuespedes(ReservaCreateDto reservaNueva, Habitacion habitacion)
        {
            if (reservaNueva.HuespedesIds.Count > habitacion.CapacidadPersonas)
            {
                throw new InvalidOperationException("La cantidad de huespedes excede la capacidad de la habitación");
            }
        }
    }
}

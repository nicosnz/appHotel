using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Reservas;

namespace backend.Services.Reservas
{
    public class ValidarFechas
    {
        public static void ValidarFechasCheck(ReservaCreateDto reservaNueva)
        {
            var hoy = DateOnly.FromDateTime(DateTime.UtcNow);

            if (reservaNueva.FechaCheckInEsperado < hoy)
            {
                throw new InvalidOperationException(
                    "La fecha de check-in no puede ser menor a hoy."
                );
            }

            if (reservaNueva.FechaCheckOutEsperado <= reservaNueva.FechaCheckInEsperado)
            {
                throw new InvalidOperationException(
                    "La fecha de check-out debe ser mayor al check-in."
                );
            }
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Habitaciones;
using backend.Models;

namespace backend.Services.Reservas
{
    public class MapearHabitacion
    {
        public static HabitacionResponseSimpleDto MapearHabitacionExec(Reserva reserva)
        {
            return new HabitacionResponseSimpleDto
            {
                Id = reserva.Habitacion.Id,
                TipoHabitacion = reserva.Habitacion.TipoHabitacion,
                NumHabitacion = reserva.Habitacion.NumHabitacion,
                CapacidadPersonas = reserva.Habitacion.CapacidadPersonas,
                Precio = reserva.Habitacion.Precio,
                TipoCama = reserva.Habitacion.TipoCama,
                Piso = reserva.Habitacion.Piso,
                EstadoHabitacion = reserva.Habitacion.EstadoHabitacion
            };
        }
    }
}
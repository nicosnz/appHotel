using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Reservas;
using backend.Models;

namespace backend.Services.Reservas
{
    public class MapearReserva
    {
        public static  ReservaResponseDto MapearReservaExec(Reserva reserva)
        {
            return new ReservaResponseDto
            {
                Id = reserva.Id,
                Huespedes = reserva.Huespedes
                    .Select(MapearHuesped.MapearHuespedExec)
                    .ToList(),

                HabitacionId = reserva.HabitacionId,
                EstadoReserva = reserva.EstadoReserva,
                FechaCheckInEsperado = reserva.FechaCheckInEsperado,
                FechaCheckInActual = reserva.FechaCheckInActual,
                FechaCheckOutEsperado = reserva.FechaCheckOutEsperado,
                FechaCheckOutActual = reserva.FechaCheckOutActual,
                PrecioTotal = reserva.PrecioTotal,
                Mora = reserva.Mora,
                Habitacion = MapearHabitacion.MapearHabitacionExec(reserva)
            };
        }
    }
}
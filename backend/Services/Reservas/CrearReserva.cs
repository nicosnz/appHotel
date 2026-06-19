using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Reservas;
using backend.Models;
using backend.Repositories.Habitaciones;
using backend.Repositories.Huespedes;
using backend.Repositories.Reservas;

namespace backend.Services.Reservas
{
    public class CrearReserva
    {
        private readonly IReservasRepository reservasRepository;
        private readonly IHuespedRepository huespedRepository;
        private readonly IHabitacionRepository habitacionRepository;

        public CrearReserva(IReservasRepository reservasRepository, IHuespedRepository huespedRepository, IHabitacionRepository habitacionRepository)
        {
            this.reservasRepository = reservasRepository;
            this.huespedRepository = huespedRepository;
            this.habitacionRepository = habitacionRepository;
        }

        public async Task<Guid> Crear(ReservaCreateDto reservaNueva)
        {
            ValidarFechas.ValidarFechasCheck(reservaNueva);

            List<Huesped> huespedes = new List<Huesped>();
            foreach (var huespedId in reservaNueva.HuespedesIds)
            {
                var huesped = await huespedRepository.GetById(huespedId);
                if (huesped.Activo == true)
                {
                    throw new InvalidOperationException("El usuario ya esta en otra reserva.");
                }

            }
            await ValidarDisponibilidad.ValidarHabitacionDisponible(
                habitacionRepository,
                reservaNueva.HabitacionId,
                reservaNueva.FechaCheckInEsperado,
                reservaNueva.FechaCheckOutEsperado
            );

            var habitacion = await habitacionRepository.GetHabitacionById(reservaNueva.HabitacionId);
            foreach (var huespedId in reservaNueva.HuespedesIds)
            {
                var huesped = await huespedRepository.GetById(huespedId);
                await huespedRepository.UpdateActivo(huesped.Id);
                huespedes.Add(huesped);

            }
            await habitacionRepository.UpdateEstadoHabitacion(habitacion.Id, "RESERVADA");
            decimal precioTotal = habitacion.Precio * (reservaNueva.FechaCheckOutEsperado.DayNumber - reservaNueva.FechaCheckInEsperado.DayNumber);
            var reserva = Reserva.Crear(huespedes, reservaNueva.HabitacionId, habitacion, reservaNueva.FechaCheckInEsperado, reservaNueva.FechaCheckOutEsperado, precioTotal);
            var reservaId = await reservasRepository.Add(reserva);
            return reservaId;
        }

    }
}
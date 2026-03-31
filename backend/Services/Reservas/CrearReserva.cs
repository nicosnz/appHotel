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
            var huespedes = await huespedRepository.GetListHuespedes(reservaNueva.HuespedesIds);
            var habitacion = await habitacionRepository.GetHabitacionById(reservaNueva.HabitacionId);
            if (habitacion.EstadoHabitacion != EstadoHabitacion.LIBRE)
            {
                throw new InvalidOperationException("La habitación no está disponible para reservar.");

            }
            if(huespedes.Count > habitacion.CapacidadPersonas)
            {
                throw new InvalidOperationException("La cantidad de huespedes excede la capacidad de la habitación");
            }
            await habitacionRepository.UpdateEstadoHabitacion(habitacion.Id,"RESERVADA");
            decimal precioTotal = habitacion.Precio * huespedes.Count;
            var reserva = Reserva.Crear(huespedes,reservaNueva.HabitacionId,habitacion,reservaNueva.FechaCheckInEsperado,reservaNueva.FechaCheckOutEsperado,precioTotal);
            var reservaId = await reservasRepository.Add(reserva);
            return reservaId;
        }
    }
}
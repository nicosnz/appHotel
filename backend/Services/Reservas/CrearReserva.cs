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
            var hoy = DateOnly.FromDateTime(DateTime.UtcNow);
            if (reservaNueva.FechaCheckInEsperado < hoy)
            {
                throw new InvalidOperationException("La fecha de check-in no puede ser menor a hoy.");
            }

            if (reservaNueva.FechaCheckOutEsperado <= reservaNueva.FechaCheckInEsperado)
            {
                throw new InvalidOperationException("La fecha de check-out debe ser mayor al check-in.");
            }

            List<Huesped> huespedes = new List<Huesped>();
            foreach (var huespedId in reservaNueva.HuespedesIds)
            {
                var huesped = await huespedRepository.GetById(huespedId);
                if(huesped.Activo == true)
                {
                    throw new InvalidOperationException("El usuario ya esta en otra reserva.");
                }
                
            }
            var habitacionDisponible = await habitacionRepository.EstaDisponible(
                reservaNueva.HabitacionId,
                reservaNueva.FechaCheckInEsperado,
                reservaNueva.FechaCheckOutEsperado
            );

            if (!habitacionDisponible)
            {
                throw new InvalidOperationException("La habitación no está disponible en esas fechas.");
            }
            var habitacion = await habitacionRepository.GetHabitacionById(reservaNueva.HabitacionId);
            if( reservaNueva.HuespedesIds.Count > habitacion.CapacidadPersonas)
            {
                throw new InvalidOperationException("La cantidad de huespedes excede la capacidad de la habitación");
            }
            foreach (var huespedId in reservaNueva.HuespedesIds)
            {
                var huesped = await huespedRepository.GetById(huespedId);
                await huespedRepository.UpdateActivo(huesped.Id);
                huespedes.Add(huesped);
                
            }
            await habitacionRepository.UpdateEstadoHabitacion(habitacion.Id,"RESERVADA");
            decimal precioTotal = habitacion.Precio * (reservaNueva.FechaCheckOutEsperado.DayNumber - reservaNueva.FechaCheckInEsperado.DayNumber);
            var reserva = Reserva.Crear(huespedes,reservaNueva.HabitacionId,habitacion,reservaNueva.FechaCheckInEsperado,reservaNueva.FechaCheckOutEsperado,precioTotal);
            var reservaId = await reservasRepository.Add(reserva);
            return reservaId;
        }
    }
}
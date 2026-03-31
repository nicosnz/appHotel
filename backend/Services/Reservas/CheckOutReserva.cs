using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Repositories.Habitaciones;
using backend.Repositories.Reservas;

namespace backend.Services.Reservas
{
    public class CheckOutReserva
    {
        private IReservasRepository reservasRepository;
        private IHabitacionRepository habitacionRepository;

        public CheckOutReserva(IReservasRepository reservasRepository, IHabitacionRepository habitacionRepository)
        {
            this.reservasRepository = reservasRepository;
            this.habitacionRepository = habitacionRepository;
        }

        public async Task<bool> CheckOut(Guid Id)
        {
            var reserva = await reservasRepository.GetReservaId(Id);
            DateTime FechaActual = DateTime.UtcNow;
            decimal mora = 0;
            if(FechaActual > reserva.FechaCheckOutEsperado && FechaActual > reserva.FechaCheckInEsperado)
            {
                mora = MoraAtraso.CalcularMora(FechaActual,reserva.FechaCheckInEsperado);
                await reservasRepository.UpdateFechaCheckOutActual(reserva.Id,FechaActual);
                await reservasRepository.UpdateMora(reserva.Id,mora);
                await reservasRepository.UpdateEstadoReserva(reserva.Id,"TERMINADA");
                await habitacionRepository.UpdateEstadoHabitacion(reserva.HabitacionId,"LIBRE");
                return true;
            }
            else if(FechaActual < reserva.FechaCheckOutEsperado)
            {
                await habitacionRepository.UpdateEstadoHabitacion(reserva.HabitacionId,"LIBRE");

                await reservasRepository.UpdateFechaCheckOutActual(reserva.Id,FechaActual);
                await reservasRepository.UpdateEstadoReserva(reserva.Id,"TERMINADA");
                return true;
            }
            return false;

        }
    }
}
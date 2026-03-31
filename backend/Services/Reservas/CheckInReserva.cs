using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Repositories.Habitaciones;
using backend.Repositories.Reservas;

namespace backend.Services.Reservas
{
    public class CheckInReserva
    {
        private IReservasRepository reservasRepository;
        private IHabitacionRepository habitacionRepository;

        public CheckInReserva(IReservasRepository reservasRepository, IHabitacionRepository habitacionRepository)
        {
            this.reservasRepository = reservasRepository;
            this.habitacionRepository = habitacionRepository;
        }

        public async Task<bool> CheckIn(Guid Id)
        {
            var reserva = await reservasRepository.GetReservaId(Id);
            DateTime FechaActual = DateTime.UtcNow;
            decimal mora = 0;
            if(FechaActual > reserva.FechaCheckInEsperado && FechaActual < reserva.FechaCheckOutEsperado)
            {
                mora = MoraAtraso.CalcularMora(FechaActual,reserva.FechaCheckInEsperado);
                await reservasRepository.UpdateFechaCheckInActual(reserva.Id,FechaActual);
                await reservasRepository.UpdateMora(reserva.Id,mora);
                await reservasRepository.UpdateEstadoReserva(reserva.Id,"EN_PROCESO");
                await habitacionRepository.UpdateEstadoHabitacion(reserva.HabitacionId,"OCUPADA");
                return true;
            }
            else if(FechaActual < reserva.FechaCheckInEsperado)
            {
                await habitacionRepository.UpdateEstadoHabitacion(reserva.HabitacionId,"OCUPADA");
                await reservasRepository.UpdateFechaCheckInActual(reserva.Id,FechaActual);
                await reservasRepository.UpdateEstadoReserva(reserva.Id,"EN_PROCESO");
                return true;
            }
            return false;

        }
    }
}
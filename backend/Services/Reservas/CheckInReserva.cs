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

            var ahora = DateTime.UtcNow;
            var hoy = DateOnly.FromDateTime(ahora);

            decimal mora = 0;

            if (hoy > reserva.FechaCheckInEsperado && hoy < reserva.FechaCheckOutEsperado)
            {
                mora = MoraAtraso.CalcularMora(ahora, reserva.FechaCheckInEsperado.ToDateTime(TimeOnly.MinValue));

                await reservasRepository.UpdateFechaCheckInActual(reserva.Id, ahora);
                await reservasRepository.UpdateMora(reserva.Id, mora);
                await reservasRepository.UpdateEstadoReserva(reserva.Id, "EN_PROCESO");
                await habitacionRepository.UpdateEstadoHabitacion(reserva.HabitacionId, "OCUPADA");

                return true;
            }

            else if (hoy == reserva.FechaCheckInEsperado)
            {
                await reservasRepository.UpdateFechaCheckInActual(reserva.Id, ahora);
                await reservasRepository.UpdateEstadoReserva(reserva.Id, "EN_PROCESO");
                await habitacionRepository.UpdateEstadoHabitacion(reserva.HabitacionId, "OCUPADA");

                return true;
            }

            throw new InvalidOperationException("Solo se puede realizar el Check In el dia esperado");
        }
    }
}
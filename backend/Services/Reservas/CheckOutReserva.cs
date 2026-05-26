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

        public async Task<bool> CheckOut(Guid id)
        {
            var reserva = await reservasRepository.GetReservaId(id);

            var ahora = DateTime.UtcNow;
            var hoy = DateOnly.FromDateTime(ahora);

            if (hoy > reserva.FechaCheckOutEsperado)
            {
                var mora = MoraAtraso.CalcularMora(
                    ahora,
                    reserva.FechaCheckOutEsperado.ToDateTime(TimeOnly.MinValue)
                );

                await reservasRepository.UpdateMora(reserva.Id, mora);
            }

            await reservasRepository.UpdateFechaCheckOutActual(reserva.Id, ahora);
            await reservasRepository.UpdateEstadoReserva(reserva.Id, "TERMINADA");
            await habitacionRepository.UpdateEstadoHabitacion(reserva.HabitacionId, "LIBRE");

            return true;
        }
    }
}
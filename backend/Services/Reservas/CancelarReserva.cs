using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Repositories.Habitaciones;
using backend.Repositories.Huespedes;
using backend.Repositories.Reservas;

namespace backend.Services.Reservas
{
    public class CancelarReserva
    {
        private readonly IReservasRepository reservasRepository;
        private readonly IHabitacionRepository habitacionRepository;
        private readonly IHuespedRepository huespedRepository;

        public CancelarReserva(IReservasRepository reservasRepository, IHabitacionRepository habitacionRepository, IHuespedRepository huespedRepository)
        {
            this.reservasRepository = reservasRepository;
            this.habitacionRepository = habitacionRepository;
            this.huespedRepository = huespedRepository;
        }

        public async Task Cancelar(Guid Id)
        {
            var reserva = await reservasRepository.GetReservaId(Id);
            var huespedes = reserva.Huespedes;
            if(reserva.EstadoReserva != Models.EstadoReserva.ACEPTADA)
            {
                throw new InvalidOperationException("Solo se pueden cancelar reservas pendientes");

            }
            foreach (var huesped in huespedes)
            {
                await huespedRepository.UpdateInactivo(huesped.Id);
            }
            await reservasRepository.UpdateEstadoReserva(Id,"CANCELADA");
            await habitacionRepository.UpdateEstadoHabitacion(reserva.HabitacionId,"LIBRE");

        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Habitaciones;
using backend.Dtos.Huespedes;
using backend.Dtos.Reservas;
using backend.Repositories.Reservas;

namespace backend.Services.Reservas
{
    public class ObtenerReservas
    {
        private IReservasRepository reservasRepository;

        public ObtenerReservas(IReservasRepository reservasRepository)
        {
            this.reservasRepository = reservasRepository;
        }

        public async Task<List<ReservaResponseDto>> GetReservas()
        {
            var reservas = await reservasRepository.GetReservas();

            return reservas
                .Select(MapearReserva.MapearReservaExec)
                .ToList();
        }
    }
}
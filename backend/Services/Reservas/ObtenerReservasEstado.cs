using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Reservas;
using backend.Repositories.Reservas;

namespace backend.Services.Reservas
{
    public class ObtenerReservasEstado
    {
        private readonly IReservasRepository reservasRepository;

        public ObtenerReservasEstado(IReservasRepository reservasRepository)
        {
            this.reservasRepository = reservasRepository;
        }

        public async Task<List<ReservaResponseDto>> GetReservasEstado(string estadoReserva)
        {
            var reservas = await reservasRepository.GetReservasEstado(estadoReserva);

            return reservas
                .Select(MapearReserva.MapearReservaExec)
                .ToList();
        }
    }
}
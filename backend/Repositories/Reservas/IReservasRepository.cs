using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Repositories.Reservas
{
    public interface IReservasRepository
    {
        Task<Guid> Add(Reserva reservaNueva);
        Task<Reserva> GetReservaId(Guid Id);
        Task<List<Reserva>> GetReservasEstado(string estadoReserva);
        Task<List<Reserva>> GetReservas();
        Task UpdateEstadoReserva(Guid Id,string estadoNuevo);
        Task UpdateFechaCheckInActual(Guid Id,DateTime fechaActual);
        Task UpdateFechaCheckOutActual(Guid Id,DateTime fechaActual);
        Task UpdateMora(Guid Id, decimal mora);
    }
}
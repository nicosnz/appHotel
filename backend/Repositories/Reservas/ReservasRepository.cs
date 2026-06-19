using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.Reservas
{
    public class ReservasRepository : IReservasRepository
    {
        private readonly ApplicationDbContext applicationDbContext;

        public ReservasRepository(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }

        public async  Task<Guid> Add(Reserva reservaNueva)
        {
            await applicationDbContext.Reservas.AddAsync(reservaNueva);
            await applicationDbContext.SaveChangesAsync();
            return reservaNueva.Id;
        }

        public async Task<List<Reserva>> GetReservasEstado(string estadoReserva)
        {
            var tipoEnum = Enum.Parse<EstadoReserva>(estadoReserva);

            var reservas = await applicationDbContext.Reservas.Where(r => r.EstadoReserva == tipoEnum).Include(r => r.Huespedes)     
                                .Include(r => r.Habitacion).ToListAsync();     
            return reservas;
        }

        public async Task<Reserva> GetReservaId(Guid Id)
        {
            var reserva = await applicationDbContext.Reservas.Include(r => r.Huespedes)     
                                .Include(r => r.Habitacion)     
                                .FirstOrDefaultAsync(r => r.Id == Id);;
            return reserva;

        }
        public async Task<List<Reserva>> GetReservas()
        {
            var reservas = await applicationDbContext.Reservas.Include(r => r.Huespedes)     
                                .Include(r => r.Habitacion).ToListAsync();     
            return reservas;

        }

        public async Task UpdateEstadoReserva(Guid Id,string estadoNuevo)
        {
            var tipoEnum = Enum.Parse<EstadoReserva>(estadoNuevo);
            var reserva = await GetReservaId(Id);
            reserva.EstadoReserva = tipoEnum;
            await applicationDbContext.SaveChangesAsync();
        }

        public async Task UpdateFechaCheckInActual(Guid Id, DateTime fechaActual)
        {
            var reserva = await GetReservaId(Id);
            reserva.FechaCheckInActual = fechaActual;
            await applicationDbContext.SaveChangesAsync();
        }
        public async Task UpdateFechaCheckOutActual(Guid Id, DateTime fechaActual)
        {
            var reserva = await GetReservaId(Id);
            reserva.FechaCheckOutActual = fechaActual;
            await applicationDbContext.SaveChangesAsync();
        }

        public async Task UpdateMora(Guid Id, decimal mora)
        {
            var reserva = await GetReservaId(Id);
            reserva.Mora = mora;
            reserva.PrecioTotal+=mora;
            await applicationDbContext.SaveChangesAsync();
        }
    }
}
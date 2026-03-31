using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Huespedes;
using backend.Dtos.Reservas;
using backend.Models;
using backend.Repositories.Huespedes;

namespace backend.Services.Huespedes
{
    public class ObtenerHuespedConReservas
    {
        private readonly IHuespedRepository huespedRepository;

        public ObtenerHuespedConReservas(IHuespedRepository huespedRepository)
        {
            this.huespedRepository = huespedRepository;
        }

        public async Task<HuespedResponseGetDto> ObtenerHuespedReserva(Guid Id)
        {
            var huesped = await huespedRepository.GetByIdWithReservas(Id);

            if (huesped == null)
                throw new KeyNotFoundException($"No se encontró el huésped con Id {Id}");

            var reservasDto = huesped.Reservas.Select(reserva => new ReservaResponseDto
            {
                Id = reserva.Id,
                EstadoReserva = reserva.EstadoReserva,
                FechaCheckInEsperado = reserva.FechaCheckInEsperado,
                FechaCheckOutEsperado = reserva.FechaCheckOutEsperado,
                PrecioTotal = reserva.PrecioTotal,
                HabitacionId = reserva.HabitacionId,
                FechaCheckInActual = reserva.FechaCheckInActual,
                FechaCheckOutActual = reserva.FechaCheckOutActual,

                Huespedes = reserva.Huespedes
                    .Where(h => h.Id != Id)
                    .Select(h => new HuespedResponseDto
                    {
                        Id = h.Id,
                        Nombre = h.Nombre,
                        Apellido = h.Apellido,
                        Documento = h.Documento
                    }).ToList()

            }).ToList();

            return new HuespedResponseGetDto
            {
                Id = huesped.Id,
                Nombre = huesped.Nombre,
                Apellido = huesped.Apellido,
                Documento = huesped.Documento,
                Genero = huesped.Genero,
                Reservas = reservasDto
            };
        }
    }
}
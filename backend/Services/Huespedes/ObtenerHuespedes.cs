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
    public class ObtenerHuespedes
    {
        private readonly IHuespedRepository huespedRepository;

        public ObtenerHuespedes(IHuespedRepository huespedRepository)
        {
            this.huespedRepository = huespedRepository;
        }

        public async Task<List<HuespedResponseGetDto>> GetAll()
        {
            var huespedes = await huespedRepository.GetAll();
            List<HuespedResponseGetDto> huespedesNuevo = new List<HuespedResponseGetDto>();
            foreach (var huesped in huespedes)
            {
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
                    Mora = reserva.Mora,

                    Huespedes = reserva.Huespedes
                        .Where(h => h.Id != huesped.Id)
                        .Select(h => new HuespedResponseDto
                        {
                            Id = h.Id,
                            Nombre = h.Nombre,
                            Apellido = h.Apellido,
                            Documento = h.Documento,
                            Activo = h.Activo
                        }).ToList()

                }).ToList();

                var huespedNuevo =  new HuespedResponseGetDto
                {
                    Id = huesped.Id,
                    Nombre = huesped.Nombre,
                    Apellido = huesped.Apellido,
                    Documento = huesped.Documento,
                    Genero = huesped.Genero,
                    Activo = huesped.Activo,
                    Reservas = reservasDto
                };
                huespedesNuevo.Add(huespedNuevo);
            }
            return huespedesNuevo;
        }
    }
}
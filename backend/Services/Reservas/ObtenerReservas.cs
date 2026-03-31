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
            var reservasDtos = new List<ReservaResponseDto>();
            foreach (var reserva in reservas)
            {
                var huespedes = reserva.Huespedes;
                var huespedesDto = new List<HuespedResponseDto>();
                foreach (var huesped in huespedes)
                {
                    var huespedDto = new HuespedResponseDto
                    {
                        Id = huesped.Id,
                        Nombre = huesped.Nombre,
                        Apellido = huesped.Apellido,
                        Documento = huesped.Documento
                    };
                    huespedesDto.Add(huespedDto);
                }
                var habitacionDto = new HabitacionResponseSimpleDto
                {
                    Id = reserva.Habitacion.Id,
                    TipoHabitacion = reserva.Habitacion.TipoHabitacion,
                    NumHabitacion = reserva.Habitacion.NumHabitacion,
                    CapacidadPersonas = reserva.Habitacion.CapacidadPersonas,
                    Precio = reserva.Habitacion.Precio,
                    TipoCama = reserva.Habitacion.TipoCama,
                    Piso = reserva.Habitacion.Piso,
                    EstadoHabitacion = reserva.Habitacion.EstadoHabitacion
                };
                var reservaDto = new ReservaResponseDto
                {
                    Id = reserva.Id,
                    Huespedes = huespedesDto,
                    HabitacionId = reserva.HabitacionId,
                    EstadoReserva = reserva.EstadoReserva,
                    FechaCheckInEsperado = reserva.FechaCheckInEsperado,
                    FechaCheckInActual = reserva.FechaCheckInActual,
                    FechaCheckOutEsperado = reserva.FechaCheckOutEsperado,
                    FechaCheckOutActual = reserva.FechaCheckOutActual,
                    PrecioTotal = reserva.PrecioTotal,
                    Habitacion = habitacionDto
                    
                };
                reservasDtos.Add(reservaDto);
            }

            return reservasDtos;
        }
    }
}
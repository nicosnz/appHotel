using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Habitaciones;
using backend.Dtos.Huespedes;
using backend.Models;

namespace backend.Dtos.Reservas
{
    public class ReservaResponseDto
    {
        public Guid Id { get; set; }
        public List<HuespedResponseDto> Huespedes { get; set; }  
        public Guid HabitacionId { get; set; }
        public EstadoReserva EstadoReserva { get; set; }
        public DateTime FechaCheckInEsperado { get; set; }
        public DateTime FechaCheckOutEsperado { get; set; }
        public DateTime? FechaCheckInActual { get; set; }
        public DateTime? FechaCheckOutActual { get; set; }
        public decimal PrecioTotal { get; set; }
        public HabitacionResponseSimpleDto Habitacion {get;set;}

    }
}
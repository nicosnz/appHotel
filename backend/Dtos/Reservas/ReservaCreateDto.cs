using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Dtos.Reservas
{
    public class ReservaCreateDto
    {
        public List<Guid> HuespedesIds { get; set; }
        public Guid HabitacionId {get;set;}
        public DateTime FechaCheckInEsperado {get;set;}
        public DateTime FechaCheckOutEsperado {get; set;}
        public decimal PrecioTotal { get; set; }
    }
}
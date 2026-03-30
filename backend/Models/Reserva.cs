using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Reserva
    {
        public Guid Id { get; set; }
        public List<Huesped> Huespedes { get; set; }
        public Habitacion Habitacion { get; set; }
        public EstadoReserva EstadoReserva { get; set; }
        public decimal Mora { get; set; }
        public decimal PrecioTotal { get; set; }
    }
}
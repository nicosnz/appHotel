using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Dtos.Habitaciones
{
    public class HabitacionResponseSimpleDto
    {
        public Guid Id { get; set; }
        public TipoHabitacion TipoHabitacion { get; set; }
        public string NumHabitacion { get; set; }
        public int CapacidadPersonas { get; set; }
        public decimal Precio { get; set; }
        public TipoCama TipoCama { get; set; }
        public int Piso { get; set; }
        public EstadoHabitacion EstadoHabitacion { get; set; }
    }
}
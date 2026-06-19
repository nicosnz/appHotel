using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Empleado
    {
        public Guid Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Documento { get; set; }
        public string Genero { get; set; }
        public TipoEmpleado TipoEmpleado {get;set;}
        public TurnoEmpleado TurnoEmpleado {get;set;}
        public bool Activo {get;set;}
    }
}
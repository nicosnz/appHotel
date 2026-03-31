using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Reservas;

namespace backend.Dtos.Huespedes
{
    public class HuespedResponseGetDto
    {
        public Guid Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Documento { get; set; }
        public string Genero { get; set; }
        public List<ReservaResponseDto> Reservas {get;set;}
    }
}
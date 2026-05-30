using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Huespedes;
using backend.Models;

namespace backend.Services.Reservas
{
    public class MapearHuesped
    {
        public static HuespedResponseDto MapearHuespedExec(Huesped huesped)
        {
            return new HuespedResponseDto
            {
                Id = huesped.Id,
                Nombre = huesped.Nombre,
                Apellido = huesped.Apellido,
                Documento = huesped.Documento
            };
        }
    }
}
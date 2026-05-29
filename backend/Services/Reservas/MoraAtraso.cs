using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services.Reservas
{
    public class MoraAtraso
    {
        public static int MORA_POR_DIA = 50;
        public static decimal CalcularMora(DateTime fechaActual, DateTime fechaEsperada)
        {
            
            
            var atraso = fechaActual - fechaEsperada;

            
            var diasAtraso = Math.Max(0, Math.Ceiling(atraso.TotalDays));

            decimal mora = (decimal)diasAtraso * MORA_POR_DIA;
            return mora;
            
            
            
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services.Reservas
{
    public class MoraAtraso
    {
        public static decimal CalcularMora(DateTime fechaActual, DateTime fechaEsperada)
        {
            
            
            var atraso = fechaActual - fechaEsperada;

            decimal moraPorDia = 50; 
            var diasAtraso = Math.Ceiling(atraso.TotalDays);

            decimal mora = (decimal)diasAtraso * moraPorDia;
            return mora;
            
            
            
        }
    }
}
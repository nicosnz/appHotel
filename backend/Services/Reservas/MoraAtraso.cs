using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Services.Reservas
{
    public class MoraAtraso
    {
        private const int MoraPorDia = 50;
        public static decimal CalcularMora(DateTime fechaActual, DateTime fechaEsperada)
        {
            
            
            var atraso = fechaActual - fechaEsperada;

            
            var diasAtraso = Math.Max(0, Math.Ceiling(atraso.TotalDays));

            decimal mora = (decimal)diasAtraso * MoraPorDia;
            return mora;
            
            
            
        }
    }
}
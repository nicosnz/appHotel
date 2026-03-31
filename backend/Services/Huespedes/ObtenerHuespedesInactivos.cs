using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Repositories.Huespedes;

namespace backend.Services.Huespedes
{
    public class ObtenerHuespedesInactivos
    {
        private readonly IHuespedRepository huespedRepository;

        public ObtenerHuespedesInactivos(IHuespedRepository huespedRepository)
        {
            this.huespedRepository = huespedRepository;
        }
        public Task<List<Huesped>> HuespedesInactivos()
        {
            return huespedRepository.HuespedesInactivos();
        }
    }
}
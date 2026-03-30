using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Repositories.Huespedes;

namespace backend.Services.Huespedes
{
    public class ObtenerHuespedes
    {
        private readonly IHuespedRepository huespedRepository;

        public ObtenerHuespedes(IHuespedRepository huespedRepository)
        {
            this.huespedRepository = huespedRepository;
        }

        public async Task<List<Huesped>> GetAll()
        {
            var huespedes = await huespedRepository.GetAll();
            return huespedes;
        }
    }
}
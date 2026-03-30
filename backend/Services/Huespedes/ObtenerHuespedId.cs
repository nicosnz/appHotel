using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Repositories.Huespedes;

namespace backend.Services.Huespedes
{
    public class ObtenerHuespedId
    {
        private readonly IHuespedRepository huespedRepository;

        public ObtenerHuespedId(IHuespedRepository huespedRepository)
        {
            this.huespedRepository = huespedRepository;
        }

        public async Task<Huesped> GetHuespedIdAsync(Guid id)
        {
            var huesped = await this.huespedRepository.GetById(id);
            return huesped;
        }
    }
}
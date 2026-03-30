using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.Huespedes
{
    public class HuespedRepository : IHuespedRepository
    {
        private readonly ApplicationDbContext applicationDbContext;
        public HuespedRepository(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }
        public async Task<Guid> Add(Huesped nuevoHuesped)
        {
            
            await applicationDbContext.AddAsync(nuevoHuesped);
            await applicationDbContext.SaveChangesAsync();
            return nuevoHuesped.Id;
        }

        public async Task<List<Huesped>> GetAll()
        {
            var huespedes = await applicationDbContext.Huespedes.ToListAsync();
            return huespedes;
        }

        public async Task<Huesped> GetById(Guid id)
        {
            Huesped huesped = await applicationDbContext.Huespedes.FirstOrDefaultAsync(h => h.Id == id);
            return huesped;
        }
    }
}
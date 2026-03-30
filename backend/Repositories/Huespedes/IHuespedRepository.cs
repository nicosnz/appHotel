using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos;
using backend.Models;

namespace backend.Repositories.Huespedes
{
    public interface IHuespedRepository
    {
        Task<Guid> Add(Huesped nuevoHuesped);
        Task<Huesped> GetById(Guid id);
        Task<List<Huesped>> GetAll();



        
    }
}
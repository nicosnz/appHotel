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
        Task<Huesped> GetByDocumento(string Documento);
        Task<List<Huesped>> GetAll();
        Task<List<Huesped>> GetListHuespedes(List<Guid> huespedes);
        Task<Huesped> GetByIdWithReservas(Guid id);
        Task UpdateActivo(Guid id);
        Task UpdateInactivo(Guid id);
        Task<List<Huesped>> HuespedesInactivos();


        
    }
}
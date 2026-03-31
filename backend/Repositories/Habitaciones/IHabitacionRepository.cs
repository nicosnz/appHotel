using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Repositories.Habitaciones
{
    public interface IHabitacionRepository
    {
        Task<Habitacion> GetHabitacionById(Guid Id);
        Task<List<Habitacion>> GetAll();
        Task<List<Habitacion>> GetHabitacionesTipo(string TipoHabitacion);
        Task<List<Habitacion>> GetHabitacionesEstado(string EstadoHabitacion);
        Task UpdateEstadoHabitacion(Guid Id,string estadoNuevo);
    }
}
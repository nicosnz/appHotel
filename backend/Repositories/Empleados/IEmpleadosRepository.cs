using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Repositories.Empleados
{
    public interface IEmpleadoRepository
    {
        Task<List<Empleado>> GetAllEmpleados();
    }
}
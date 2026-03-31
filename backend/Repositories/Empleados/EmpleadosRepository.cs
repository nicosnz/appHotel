using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.Empleados
{
    public class EmpleadosRepository : IEmpleadoRepository
    {

        private readonly ApplicationDbContext applicationDbContext;

        public EmpleadosRepository(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }

        public async Task<List<Empleado>> GetAllEmpleados()
        {
           var empleados = await applicationDbContext.Empleados.ToListAsync();
           return empleados;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Repositories.Empleados;

namespace backend.Services.Empleados
{
    public class ObtenerEmpleados
    {
        private readonly IEmpleadoRepository empleadoRepository;

        public ObtenerEmpleados(IEmpleadoRepository empleadoRepository)
        {
            this.empleadoRepository = empleadoRepository;
        }

        public async Task<List<Empleado>> GetEmpleados()
        {
            var empleados = await empleadoRepository.GetAllEmpleados();
            return empleados;
        }
    }
}
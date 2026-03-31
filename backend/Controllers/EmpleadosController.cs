using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Services.Empleados;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmpleadosController: ControllerBase
    {
        private readonly ObtenerEmpleados obtenerEmpleados;

        public EmpleadosController(ObtenerEmpleados obtenerEmpleados)
        {
            this.obtenerEmpleados = obtenerEmpleados;
        }

        [HttpGet]
        public async Task<List<Empleado>> GetEmpleados()
        {
            var empleados = await obtenerEmpleados.GetEmpleados();
            return empleados;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Services.Habitaciones;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [Route("[controller]")]
    public class HabitacionController : Controller
    {
        private readonly ILogger<HabitacionController> _logger;
        private readonly ObtenerHabitaciones obtenerHabitaciones;
        private readonly ObtenerHabitacionesEstado obtenerHabitacionesEstado;
        private readonly ObtenerHabitacionesTipo obtenerHabitacionesTipo;
        private readonly ObtenerHabitacionId obtenerHabitacionId;

        public HabitacionController(ILogger<HabitacionController> logger, ObtenerHabitaciones obtenerHabitaciones, ObtenerHabitacionesEstado obtenerHabitacionesEstado, ObtenerHabitacionesTipo obtenerHabitacionesTipo, ObtenerHabitacionId obtenerHabitacionId)
        {
            _logger = logger;
            this.obtenerHabitaciones = obtenerHabitaciones;
            this.obtenerHabitacionesEstado = obtenerHabitacionesEstado;
            this.obtenerHabitacionesTipo = obtenerHabitacionesTipo;
            this.obtenerHabitacionId = obtenerHabitacionId;
        }

        [HttpGet]

        public async Task<List<Habitacion>> GetAll()
        {
            var habitaciones = await this.obtenerHabitaciones.GetHabitaciones();
            return habitaciones;
        }
        [HttpGet("estado/{estado}")]

        public async Task<List<Habitacion>> GetHabitacionesEstado(string estado)
        {
            var habitaciones = await this.obtenerHabitacionesEstado.GetHabitacionesEstado(estado);
            return habitaciones;
        }
        [HttpGet("tipo/{tipo}")]

        public async Task<List<Habitacion>> GetHabitacionesTipo(string tipo)
        {
            var habitaciones = await this.obtenerHabitacionesTipo.GetHabitacionesTipo(tipo);
            return habitaciones;
        }
        [HttpGet("id/{habitacionId}")]

        public async Task<Habitacion> GetHabitacionId(Guid habitacionId)
        {
            var habitaciones = await this.obtenerHabitacionId.GetHabitacionId(habitacionId);
            return habitaciones;
        }



    }
}
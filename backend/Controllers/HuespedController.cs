using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos;
using backend.Models;
using backend.Services.Huespedes;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [Route("[controller]")]
    public class HuespedController : Controller
    {
        private readonly ILogger<HuespedController> _logger;
        private readonly CrearHuesped crearHuesped;
        private readonly ObtenerHuespedId obtenerHuespedId;
        private readonly ObtenerHuespedes obtenerHuespedes;

        public HuespedController(ILogger<HuespedController> logger, CrearHuesped crearHuesped, ObtenerHuespedId obtenerHuespedId, ObtenerHuespedes obtenerHuespedes)
        {
            _logger = logger;
            this.crearHuesped = crearHuesped;
            this.obtenerHuespedId = obtenerHuespedId;
            this.obtenerHuespedes = obtenerHuespedes;
        }



        [HttpGet]
        public async Task<List<Huesped>> GetAll()
        {
            var huespedes = await obtenerHuespedes.GetAll();
            return huespedes;
        }

        [HttpGet("{huespedId}")]

        public async Task<Huesped> GetById(Guid huespedId)
        {
            var huesped = await this.obtenerHuespedId.GetHuespedIdAsync(huespedId);
            return huesped;
        }

        [HttpPost]
        
        public async Task<Guid> Add([FromBody]HuespedCreateDto nuevoHuesped)
        {
            
            var huespedId = await this.crearHuesped.Crear(nuevoHuesped);
            return huespedId;
        }
        
    }
}
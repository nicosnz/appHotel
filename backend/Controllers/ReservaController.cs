using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos.Reservas;
using backend.Services.Reservas;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [Route("[controller]")]
    public class ReservaController : Controller
    {
        private readonly ILogger<ReservaController> _logger;
        private readonly CrearReserva crearReserva;
        private readonly ObtenerReservaId obtenerReservaId;
        private readonly ObtenerReservas obtenerReservas;
        private readonly ObtenerReservasEstado obtenerReservasEstado;
        private readonly CheckInReserva checkInReserva;
        private readonly CheckOutReserva checkOutReserva;
        private readonly CancelarReserva cancelarReserva;

        public ReservaController(ILogger<ReservaController> logger, CrearReserva crearReserva, ObtenerReservaId obtenerReservaId, ObtenerReservas obtenerReservas, ObtenerReservasEstado obtenerReservasEstado, CheckInReserva checkInReserva, CheckOutReserva checkOutReserva, CancelarReserva cancelarReserva)
        {
            _logger = logger;
            this.crearReserva = crearReserva;
            this.obtenerReservaId = obtenerReservaId;
            this.obtenerReservas = obtenerReservas;
            this.obtenerReservasEstado = obtenerReservasEstado;
            this.checkInReserva = checkInReserva;
            this.checkOutReserva = checkOutReserva;
            this.cancelarReserva = cancelarReserva;
        }
        [HttpGet("{reservaId}")]

        public async Task<ReservaResponseDto> GetReservaId(Guid reservaId)
        {
            var reserva = await obtenerReservaId.GetReservaId(reservaId);
            return reserva;
        }
        [HttpGet]

        public async Task<List<ReservaResponseDto>> GetReservas()
        {
            var reservas = await obtenerReservas.GetReservas();
            return reservas;
        }
        [HttpGet("estado/{estadoReserva}")]

        public async Task<List<ReservaResponseDto>> GetReservasEstado(string estadoReserva)
        {
            var reservas = await obtenerReservasEstado.GetReservasEstado(estadoReserva);
            return reservas;
        }

        [HttpPost]

        public async Task<IActionResult> PostReserva([FromBody] ReservaCreateDto reservaNueva)
        {
            try
            {
                var reservaId = await crearReserva.Crear(reservaNueva);
                return Ok(reservaId);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }
        [HttpPost("checkIn/{reservaId}")]

        public async Task<IActionResult> CheckIn(Guid reservaId)
        {   
            try
            {
                var resultado = await checkInReserva.CheckIn(reservaId);

                return Ok(new
                {
                    mensaje = "Check-in realizado correctamente"
                });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }
        [HttpPost("cancelar/{reservaId}")]

        public async Task<IActionResult> CancelarReserva(Guid reservaId)
        {   
            try
            {
                await cancelarReserva.Cancelar(reservaId);

                return Ok(new
                {
                    mensaje = "Reserva Cancelada Correctamente"
                });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { mensaje = ex.Message });
            }
        }
        [HttpPost("checkOut/{reservaId}")]

        public async Task<IActionResult> CheckOut(Guid reservaId)
        {
            var resultado = await checkOutReserva.CheckOut(reservaId);

            if (!resultado)
            {
                return BadRequest("No se pudo realizar el Check Out");
            }

            return Ok(new
            {
                mensaje = "Check Out realizado correctamente"
            });
        }


    }
}
using Moq;
using Xunit;
using backend.Models;
using backend.Repositories.Reservas;
using backend.Services.Reservas;

namespace backend.Tests.Services.Reservas
{
    public class ObtenerReservasTests
    {
        [Fact]
        public async Task GetReservas_DebeRetornarLasReservasCorrectamente()
        {
            var huesped = Huesped.Crear("Nicolas","Oly","7214355","M");

            var habitacion = new Habitacion
            {
                Id = Guid.NewGuid(),
                TipoHabitacion = TipoHabitacion.SIMPLE,
                NumHabitacion = "101",
                CapacidadPersonas = 2,
                Precio = 250,
                TipoCama = TipoCama.MATRIMONIAL,
                Piso = 1,
                EstadoHabitacion = EstadoHabitacion.LIBRE
            };

            var reserva = new Reserva
            {
                Id = Guid.NewGuid(),
                Huespedes = new List<Huesped> { huesped },
                HabitacionId = habitacion.Id,
                Habitacion = habitacion,
                EstadoReserva = EstadoReserva.ACEPTADA,
                FechaCheckInEsperado = new DateOnly(2026, 5, 1),
                FechaCheckOutEsperado = new DateOnly(2026, 5, 5),
                PrecioTotal = 1000,
                Mora = 0
            };

            var reservasRepositoryMock = new Mock<IReservasRepository>();

            reservasRepositoryMock
                .Setup(r => r.GetReservas())
                .ReturnsAsync(new List<Reserva> { reserva });

            var obtenerReservas = new ObtenerReservas(
                reservasRepositoryMock.Object
            );

            var resultado = await obtenerReservas.GetReservas();

            Assert.Single(resultado);

            var reservaDto = resultado[0];

            Assert.Equal(reserva.Id, reservaDto.Id);
            Assert.Equal(reserva.HabitacionId, reservaDto.HabitacionId);
            Assert.Equal(reserva.EstadoReserva, reservaDto.EstadoReserva);
            Assert.Equal(reserva.PrecioTotal, reservaDto.PrecioTotal);
            Assert.Equal(reserva.Mora, reservaDto.Mora);

            Assert.Single(reservaDto.Huespedes);
            Assert.Equal("Nicolas", reservaDto.Huespedes[0].Nombre);
            Assert.Equal("Oly", reservaDto.Huespedes[0].Apellido);

            Assert.NotNull(reservaDto.Habitacion);
            Assert.Equal(habitacion.Id, reservaDto.Habitacion.Id);
            Assert.Equal(habitacion.NumHabitacion, reservaDto.Habitacion.NumHabitacion);

            reservasRepositoryMock.Verify(
                r => r.GetReservas(),
                Times.Once
            );
        }
    }
}
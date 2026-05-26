using backend.Models;
using backend.Repositories.Huespedes;
using backend.Services.Huespedes;
using Moq;

namespace backend.Tests.Huespedes
{
    public class ObtenerHuespedConReservasTest
    {
        [Fact]
        public async Task DebeRetornarHuespedConReservas()
        {
            // Arrange
            var huespedId = Guid.NewGuid();

            var acompanante = Huesped.Crear(
                "Maria",
                "Lopez",
                "7654321",
                "F"
            );

            var huesped = Huesped.Crear(
                "Juan",
                "Perez",
                "1234567",
                "M"
            );

            var habitacion = Habitacion.Crear(
                2,
                100m
            );

            var reserva = Reserva.Crear(
                new List<Huesped> { huesped, acompanante },
                habitacion.Id,
                habitacion,
                DateOnly.FromDateTime(DateTime.UtcNow.AddDays(1)),
                DateOnly.FromDateTime(DateTime.UtcNow.AddDays(3)),
                200
            );

            huesped.Id = huespedId;

            huesped.Reservas = new List<Reserva>
            {
                reserva
            };

            var repoMock = new Mock<IHuespedRepository>();

            repoMock
                .Setup(r => r.GetByIdWithReservas(huespedId))
                .ReturnsAsync(huesped);

            var service = new ObtenerHuespedConReservas(
                repoMock.Object
            );

            // Act
            var result = await service.ObtenerHuespedReserva(huespedId);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(huesped.Nombre, result.Nombre);
            Assert.Single(result.Reservas);
            Assert.Single(result.Reservas[0].Huespedes);

            Assert.Equal(
                acompanante.Nombre,
                result.Reservas[0].Huespedes[0].Nombre
            );
        }

        [Fact]
        public async Task DebeLanzarExcepcionSiHuespedNoExiste()
        {
            var huespedId = Guid.NewGuid();

            var repoMock = new Mock<IHuespedRepository>();

            repoMock
                .Setup(r => r.GetByIdWithReservas(huespedId))
                .ReturnsAsync((Huesped)null);

            var service = new ObtenerHuespedConReservas(
                repoMock.Object
            );

            await Assert.ThrowsAsync<KeyNotFoundException>(() =>
                service.ObtenerHuespedReserva(huespedId)
            );
        }

        [Fact]
        public async Task NoDebeIncluirAlMismoHuespedEnReservas()
        {
            var huespedId = Guid.NewGuid();

            var huesped = Huesped.Crear(
                "Juan",
                "Perez",
                "1234567",
                "M"
            );

            huesped.Id = huespedId;

            var habitacion = Habitacion.Crear(
                2,
                100m
            );

            var reserva = Reserva.Crear(
                new List<Huesped> { huesped },
                habitacion.Id,
                habitacion,
                DateOnly.FromDateTime(DateTime.UtcNow.AddDays(1)),
                DateOnly.FromDateTime(DateTime.UtcNow.AddDays(2)),
                100
            );

            huesped.Reservas = new List<Reserva> { reserva };

            var repoMock = new Mock<IHuespedRepository>();

            repoMock
                .Setup(r => r.GetByIdWithReservas(huespedId))
                .ReturnsAsync(huesped);

            var service = new ObtenerHuespedConReservas(repoMock.Object);

            var result = await service.ObtenerHuespedReserva(huespedId);

            Assert.Empty(result.Reservas[0].Huespedes);
        }
    }
}
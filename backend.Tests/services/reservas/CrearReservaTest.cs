using Moq;
using Xunit;
using backend.Dtos.Reservas;
using backend.Repositories.Habitaciones;
using backend.Repositories.Huespedes;
using backend.Repositories.Reservas;
using backend.Services.Reservas;

namespace backend.Tests.services.reservas
{
    public class CrearReservaTest
    {
        private readonly Mock<IReservasRepository> _reservasRepoMock;
        private readonly Mock<IHuespedRepository> _huespedRepoMock;
        private readonly Mock<IHabitacionRepository> _habitacionRepoMock;
        private readonly CrearReserva _crearReserva;

        public CrearReservaTest()
        {
            _reservasRepoMock = new Mock<IReservasRepository>();
            _huespedRepoMock = new Mock<IHuespedRepository>();
            _habitacionRepoMock = new Mock<IHabitacionRepository>();
            _crearReserva = new CrearReserva(
                _reservasRepoMock.Object,
                _huespedRepoMock.Object,
                _habitacionRepoMock.Object
            );
        }

        [Fact]
        public async Task Crear_CuandoFechaCheckOutEsIgualACheckIn_DebeLanzarExcepcion()
        {
            var dto = new ReservaCreateDto
            {
                HuespedesIds = [Guid.NewGuid()],
                HabitacionId = Guid.NewGuid(),
                FechaCheckInEsperado = new DateOnly(2030, 1, 10),
                FechaCheckOutEsperado = new DateOnly(2030, 1, 10),
                PrecioTotal = 500
            };

            var ex = await Assert.ThrowsAsync<InvalidOperationException>(
                () => _crearReserva.Crear(dto)
            );

            Assert.Equal("La fecha de check-out debe ser mayor al check-in.", ex.Message);
        }


    }
}

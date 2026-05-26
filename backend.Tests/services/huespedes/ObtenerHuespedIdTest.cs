using backend.Models;
using backend.Repositories.Huespedes;
using backend.Services.Huespedes;
using Moq;

namespace backend.Tests.Huespedes
{
    public class ObtenerHuespedIdTest
    {
        [Fact]
        public async Task DebeRetornarHuespedSiExiste()
        {
            // Arrange
            var id = Guid.NewGuid();

            var huesped = Huesped.Crear(
                "Juan",
                "Perez",
                "1234567",
                "M"
            );

            huesped.Id = id;

            var repoMock = new Mock<IHuespedRepository>();

            repoMock
                .Setup(r => r.GetById(id))
                .ReturnsAsync(huesped);

            var service = new ObtenerHuespedId(repoMock.Object);

            // Act
            var result = await service.GetHuespedIdAsync(id);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(id, result.Id);
            Assert.Equal(huesped.Nombre, result.Nombre);
        }

        [Fact]
        public async Task DebeRetornarNullSiNoExisteHuesped()
        {
            // Arrange
            var id = Guid.NewGuid();

            var repoMock = new Mock<IHuespedRepository>();

            repoMock
                .Setup(r => r.GetById(id))
                .ReturnsAsync((Huesped)null);

            var service = new ObtenerHuespedId(repoMock.Object);

            // Act
            var result = await service.GetHuespedIdAsync(id);

            // Assert
            Assert.Null(result);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos;
using backend.Models;
using backend.Repositories.Huespedes;
using backend.Services.Huespedes;
using FluentAssertions;
using Moq;
using Xunit;

namespace backend.Tests.services.huespedes
{
    public class CrearHuespedTest
    {
         [Fact]
        public async Task Crear_RetornaGuid_CuandoDatosSonValidos()
        {
            // Arrange
            var dto = new HuespedCreateDto
            {
                Nombre = "Juan",
                Apellido = "Perez",
                Documento = "1234567",
                Genero = "M"
            };

            var repositoryMock = new Mock<IHuespedRepository>();

            repositoryMock
                .Setup(x => x.GetByDocumento(dto.Documento))
                .ReturnsAsync((Huesped?)null);

            var expectedId = Guid.NewGuid();

            repositoryMock
                .Setup(x => x.Add(It.IsAny<Huesped>()))
                .ReturnsAsync(expectedId);

            var service = new CrearHuesped(
                repositoryMock.Object
            );

            // Act
            var result = await service.Crear(dto);

            // Assert
            result.Should().Be(expectedId);

            repositoryMock.Verify(
                x => x.Add(It.IsAny<Huesped>()),
                Times.Once
            );
        }

        [Fact]
        public async Task Crear_LanzaError_SiDocumentoNoTiene7Caracteres()
        {
            // Arrange
            var dto = new HuespedCreateDto
            {
                Nombre = "Juan",
                Apellido = "Perez",
                Documento = "123",
                Genero = "M"
            };

            var repositoryMock = new Mock<IHuespedRepository>();

            var service = new CrearHuesped(
                repositoryMock.Object
            );

            // Act
            Func<Task> act = async () =>
            {
                await service.Crear(dto);
            };

            // Assert
            await act.Should()
                .ThrowAsync<InvalidOperationException>()
                .WithMessage(
                    "El documento debe de ser de 7 caracteres"
                );
        }
        [Fact]
        public async Task Crear_LanzaError_SiHuespedYaExiste()
        {
            var dto = new HuespedCreateDto
            {
                Nombre = "Juan",
                Apellido = "Perez",
                Documento = "1234567",
                Genero = "M"
            };

            var repositoryMock = new Mock<IHuespedRepository>();

            repositoryMock
                .Setup(x => x.GetByDocumento(dto.Documento))
                .ReturnsAsync(
                    Huesped.Crear(
                        "Juan",
                        "Perez",
                        "1234567",
                        "M"
                    )
                );

            var service = new CrearHuesped(
                repositoryMock.Object
            );

            Func<Task> act = async () =>
            {
                await service.Crear(dto);
            };

            await act.Should()
                .ThrowAsync<InvalidOperationException>()
                .WithMessage(
                    "Este usuario ya existe"
                );
        }

    }
}
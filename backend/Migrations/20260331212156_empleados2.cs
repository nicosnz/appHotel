using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class empleados2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Empleados",
                columns: new[] { "Id", "Activo", "Apellido", "Documento", "Genero", "Nombre", "TipoEmpleado", "TurnoEmpleado" },
                values: new object[,]
                {
                    { new Guid("11111111-1111-1111-1111-111111111111"), false, "Perez", "1234567", "Masculino", "Juan", "COCINA", "MANANA" },
                    { new Guid("22222222-2222-2222-2222-222222222222"), false, "Lopez", "2345678", "Femenino", "Maria", "LIMPIEZA", "MANANA" },
                    { new Guid("33333333-3333-3333-3333-333333333333"), false, "Gomez", "3456789", "Masculino", "Carlos", "MANTENIMIENTO", "MANANA" },
                    { new Guid("44444444-4444-4444-4444-444444444444"), true, "Rojas", "4567890", "Femenino", "Ana", "COCINA", "NOCHE" },
                    { new Guid("55555555-5555-5555-5555-555555555555"), true, "Martinez", "5678901", "Masculino", "Luis", "MANTENIMIENTO", "TARDE" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Empleados",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"));

            migrationBuilder.DeleteData(
                table: "Empleados",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-222222222222"));

            migrationBuilder.DeleteData(
                table: "Empleados",
                keyColumn: "Id",
                keyValue: new Guid("33333333-3333-3333-3333-333333333333"));

            migrationBuilder.DeleteData(
                table: "Empleados",
                keyColumn: "Id",
                keyValue: new Guid("44444444-4444-4444-4444-444444444444"));

            migrationBuilder.DeleteData(
                table: "Empleados",
                keyColumn: "Id",
                keyValue: new Guid("55555555-5555-5555-5555-555555555555"));
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class datosHabitaciones : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Habitaciones",
                columns: new[] { "Id", "CapacidadPersonas", "EstadoHabitacion", "NumHabitacion", "Piso", "Precio", "TipoCama", "TipoHabitacion" },
                values: new object[,]
                {
                    { new Guid("11111111-1111-1111-1111-111111111111"), 2, "LIBRE", "001", 1, 150m, "INDIVIDUAL", "SIMPLE" },
                    { new Guid("22222222-2222-2222-2222-222222222222"), 3, "LIBRE", "003", 1, 200m, "INDIVIDUAL", "DOBLE_INDIVIDUAL" },
                    { new Guid("33333333-3333-3333-3333-333333333333"), 2, "LIBRE", "004", 1, 160m, "INDIVIDUAL", "SIMPLE" },
                    { new Guid("44444444-4444-4444-4444-444444444444"), 4, "LIBRE", "005", 1, 300m, "MATRIMONIAL", "SUITE" },
                    { new Guid("55555555-5555-5555-5555-555555555555"), 2, "LIBRE", "006", 1, 180m, "INDIVIDUAL", "SIMPLE" },
                    { new Guid("66666666-6666-6666-6666-666666666666"), 3, "LIBRE", "007", 2, 220m, "INDIVIDUAL", "DOBLE_INDIVIDUAL" },
                    { new Guid("77777777-7777-7777-7777-777777777777"), 2, "LIBRE", "008", 2, 250m, "MATRIMONIAL", "DOBLE_MATRIMONIAL" },
                    { new Guid("88888888-8888-8888-8888-888888888888"), 4, "LIBRE", "009", 2, 350m, "MATRIMONIAL", "SUITE" },
                    { new Guid("99999999-9999-9999-9999-999999999999"), 2, "LIBRE", "010", 3, 190m, "INDIVIDUAL", "SIMPLE" },
                    { new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"), 3, "LIBRE", "011", 3, 230m, "INDIVIDUAL", "DOBLE_INDIVIDUAL" },
                    { new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"), 2, "LIBRE", "012", 3, 260m, "MATRIMONIAL", "DOBLE_MATRIMONIAL" },
                    { new Guid("cccccccc-cccc-cccc-cccc-cccccccccccc"), 5, "LIBRE", "013", 3, 400m, "MATRIMONIAL", "DOBLE_MATRIMONIAL" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Habitaciones",
                keyColumn: "Id",
                keyValue: new Guid("11111111-1111-1111-1111-111111111111"));

            migrationBuilder.DeleteData(
                table: "Habitaciones",
                keyColumn: "Id",
                keyValue: new Guid("22222222-2222-2222-2222-222222222222"));

            migrationBuilder.DeleteData(
                table: "Habitaciones",
                keyColumn: "Id",
                keyValue: new Guid("33333333-3333-3333-3333-333333333333"));

            migrationBuilder.DeleteData(
                table: "Habitaciones",
                keyColumn: "Id",
                keyValue: new Guid("44444444-4444-4444-4444-444444444444"));

            migrationBuilder.DeleteData(
                table: "Habitaciones",
                keyColumn: "Id",
                keyValue: new Guid("55555555-5555-5555-5555-555555555555"));

            migrationBuilder.DeleteData(
                table: "Habitaciones",
                keyColumn: "Id",
                keyValue: new Guid("66666666-6666-6666-6666-666666666666"));

            migrationBuilder.DeleteData(
                table: "Habitaciones",
                keyColumn: "Id",
                keyValue: new Guid("77777777-7777-7777-7777-777777777777"));

            migrationBuilder.DeleteData(
                table: "Habitaciones",
                keyColumn: "Id",
                keyValue: new Guid("88888888-8888-8888-8888-888888888888"));

            migrationBuilder.DeleteData(
                table: "Habitaciones",
                keyColumn: "Id",
                keyValue: new Guid("99999999-9999-9999-9999-999999999999"));

            migrationBuilder.DeleteData(
                table: "Habitaciones",
                keyColumn: "Id",
                keyValue: new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"));

            migrationBuilder.DeleteData(
                table: "Habitaciones",
                keyColumn: "Id",
                keyValue: new Guid("bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"));

            migrationBuilder.DeleteData(
                table: "Habitaciones",
                keyColumn: "Id",
                keyValue: new Guid("cccccccc-cccc-cccc-cccc-cccccccccccc"));
        }
    }
}

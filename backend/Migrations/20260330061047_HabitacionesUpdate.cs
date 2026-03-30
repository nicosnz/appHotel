using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class HabitacionesUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Habitaciones_Reservas_ReservaId",
                table: "Habitaciones");

            migrationBuilder.DropIndex(
                name: "IX_Habitaciones_ReservaId",
                table: "Habitaciones");

            migrationBuilder.DropColumn(
                name: "ReservaId",
                table: "Habitaciones");

            migrationBuilder.AddColumn<Guid>(
                name: "HabitacionId",
                table: "Reservas",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Reservas_HabitacionId",
                table: "Reservas",
                column: "HabitacionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reservas_Habitaciones_HabitacionId",
                table: "Reservas",
                column: "HabitacionId",
                principalTable: "Habitaciones",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reservas_Habitaciones_HabitacionId",
                table: "Reservas");

            migrationBuilder.DropIndex(
                name: "IX_Reservas_HabitacionId",
                table: "Reservas");

            migrationBuilder.DropColumn(
                name: "HabitacionId",
                table: "Reservas");

            migrationBuilder.AddColumn<Guid>(
                name: "ReservaId",
                table: "Habitaciones",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Habitaciones_ReservaId",
                table: "Habitaciones",
                column: "ReservaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Habitaciones_Reservas_ReservaId",
                table: "Habitaciones",
                column: "ReservaId",
                principalTable: "Reservas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

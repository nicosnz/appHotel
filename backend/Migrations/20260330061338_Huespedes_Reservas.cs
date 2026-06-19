using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class Huespedes_Reservas : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Huespedes_Reservas_ReservaId",
                table: "Huespedes");

            migrationBuilder.DropIndex(
                name: "IX_Huespedes_ReservaId",
                table: "Huespedes");

            migrationBuilder.DropColumn(
                name: "ReservaId",
                table: "Huespedes");

            migrationBuilder.CreateTable(
                name: "Huespes_Reservas",
                columns: table => new
                {
                    HuespedesId = table.Column<Guid>(type: "uuid", nullable: false),
                    ReservasId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Huespes_Reservas", x => new { x.HuespedesId, x.ReservasId });
                    table.ForeignKey(
                        name: "FK_Huespes_Reservas_Huespedes_HuespedesId",
                        column: x => x.HuespedesId,
                        principalTable: "Huespedes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Huespes_Reservas_Reservas_ReservasId",
                        column: x => x.ReservasId,
                        principalTable: "Reservas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Huespes_Reservas_ReservasId",
                table: "Huespes_Reservas",
                column: "ReservasId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Huespes_Reservas");

            migrationBuilder.AddColumn<Guid>(
                name: "ReservaId",
                table: "Huespedes",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Huespedes_ReservaId",
                table: "Huespedes",
                column: "ReservaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Huespedes_Reservas_ReservaId",
                table: "Huespedes",
                column: "ReservaId",
                principalTable: "Reservas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

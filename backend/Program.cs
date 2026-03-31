using System.Text.Json.Serialization;
using backend.Data;
using backend.Repositories.Habitaciones;
using backend.Repositories.Huespedes;
using backend.Repositories.Reservas;
using backend.Services.Habitaciones;
using backend.Services.Huespedes;
using backend.Services.Reservas;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});
builder.Services.AddControllers();
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql
    (builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddOpenApi();
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });
builder.Services.AddScoped<IHuespedRepository,HuespedRepository>();
builder.Services.AddScoped<IHabitacionRepository,HabitacionRepository>();
builder.Services.AddScoped<IReservasRepository,ReservasRepository>();
builder.Services.AddScoped<CrearHuesped>();
builder.Services.AddScoped<ObtenerHuespedId>();
builder.Services.AddScoped<ObtenerHuespedes>();
builder.Services.AddScoped<ObtenerHabitaciones>();
builder.Services.AddScoped<ObtenerHabitacionesEstado>();
builder.Services.AddScoped<ObtenerHabitacionesTipo>();
builder.Services.AddScoped<ObtenerHabitacionId>();
builder.Services.AddScoped<CrearReserva>();
builder.Services.AddScoped<ObtenerReservaId>();
builder.Services.AddScoped<ObtenerReservas>();
builder.Services.AddScoped<ObtenerReservasEstado>();
builder.Services.AddScoped<CheckInReserva>();
builder.Services.AddScoped<CheckOutReserva>();
builder.Services.AddScoped<ObtenerHuespedConReservas>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.MapControllers();


app.Run();


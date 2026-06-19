using System.Text.Json.Serialization;
using backend.Data;
using backend.Repositories.Empleados;
using backend.Repositories.Habitaciones;
using backend.Repositories.Huespedes;
using backend.Repositories.Reservas;
using backend.Services.Empleados;
using backend.Services.Habitaciones;
using backend.Services.Huespedes;
using backend.Services.Reservas;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

builder.Services.AddControllers();
var frontendUrl = Environment.GetEnvironmentVariable("FRONTEND_URL") ?? "http://localhost:5173";
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173", frontendUrl)
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var databaseUrl = Environment.GetEnvironmentVariable("DATABASE_URL");
string connectionString;
if (!string.IsNullOrEmpty(databaseUrl))
{
    var uri = new Uri(databaseUrl);
    var userInfo = uri.UserInfo.Split(':');
    var dbPort = uri.Port > 0 ? uri.Port : 5432;
    connectionString = $"Host={uri.Host};Port={dbPort};Database={uri.AbsolutePath.TrimStart('/')};Username={userInfo[0]};Password={Uri.UnescapeDataString(userInfo[1])};SSL Mode=Require;Trust Server Certificate=true";
}
else
{
    connectionString = builder.Configuration.GetConnectionString("DefaultConnection")!;
}
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(connectionString));
builder.Services.AddOpenApi();
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });
builder.Services.AddScoped<IHuespedRepository,HuespedRepository>();
builder.Services.AddScoped<IHabitacionRepository,HabitacionRepository>();
builder.Services.AddScoped<IReservasRepository,ReservasRepository>();
builder.Services.AddScoped<IEmpleadoRepository,EmpleadosRepository>();
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
builder.Services.AddScoped<ObtenerHuespedesInactivos>();
builder.Services.AddScoped<ObtenerHabitacionesRangoFecha>();
builder.Services.AddScoped<CancelarReserva>();
builder.Services.AddScoped<ObtenerEmpleados>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.Migrate();
}

app.UseCors("AllowFrontend");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.MapControllers();



app.Run();


using backend.Data;
using backend.Repositories.Huespedes;
using backend.Services.Huespedes;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddControllers();
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql
    (builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddOpenApi();
builder.Services.AddScoped<IHuespedRepository,HuespedRepository>();
builder.Services.AddScoped<CrearHuesped>();
builder.Services.AddScoped<ObtenerHuespedId>();
builder.Services.AddScoped<ObtenerHuespedes>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.MapControllers();


app.Run();


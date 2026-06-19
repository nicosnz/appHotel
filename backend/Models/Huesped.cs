using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Huesped
    {
        

        public Guid Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Documento { get; set; }
        public string Genero { get; set; }
        public bool Activo {get;set;}
        public List<Reserva> Reservas {get;set;}
        public Huesped(Guid id, string nombre, string apellido, string documento, string genero)
        {
            Id = id;
            Nombre = nombre;
            Apellido = apellido;
            Documento = documento;
            Genero = genero;
            Activo = false;
            Reservas = new List<Reserva>();
            
        }
        

        public static Huesped Crear(string nombre, string apellido, string documento, string genero)
        {
            var nuevoHuesped = new Huesped(Guid.NewGuid(),nombre,apellido,documento,genero);
            return nuevoHuesped;
        }
    }
}
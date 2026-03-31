using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Reserva
    {
        

        public Guid Id { get; set; }
        public List<Huesped> Huespedes { get; set; }
        public Guid HabitacionId {get;set;}
        public Habitacion Habitacion { get; set; }
        public EstadoReserva EstadoReserva { get; set; }
        public DateOnly FechaCheckInEsperado { get; set; }
        public DateOnly FechaCheckOutEsperado { get; set; }

        public DateTime? FechaCheckInActual { get; set; }
        public DateTime? FechaCheckOutActual { get; set; }
        public decimal Mora { get; set; }
        public decimal PrecioTotal { get; set; }
        public Reserva(){}
        public Reserva(Guid id, List<Huesped> huespedes, Guid habitacionId, Habitacion habitacion, EstadoReserva estadoReserva, DateOnly fechaCheckInEsperado, DateTime fechaCheckInActual, DateOnly fechaCheckOutEsperado, DateTime fechaCheckOutActual, decimal mora, decimal precioTotal)
        {
            Id = id;
            Huespedes = huespedes;
            HabitacionId = habitacionId;
            Habitacion = habitacion;
            EstadoReserva = estadoReserva;
            FechaCheckInEsperado = fechaCheckInEsperado;
            FechaCheckInActual = fechaCheckInActual;
            FechaCheckOutEsperado = fechaCheckOutEsperado;
            FechaCheckOutActual = fechaCheckOutActual;
            Mora = mora;
            PrecioTotal = precioTotal;
        }

        public static Reserva Crear(List<Huesped> huespedes,Guid habitacionId,Habitacion habicion,DateOnly fechaCheckIn, DateOnly fechaCheckOut,decimal precioTotal)
        {
            var reserva = new Reserva
            {
                Id = Guid.NewGuid(),
                Huespedes = huespedes,
                HabitacionId = habitacionId,
                Habitacion = habicion,
                EstadoReserva = EstadoReserva.ACEPTADA,
                FechaCheckInEsperado = fechaCheckIn,
                FechaCheckInActual = null,
                FechaCheckOutEsperado = fechaCheckOut,
                FechaCheckOutActual = null,
                Mora = 0,
                PrecioTotal = precioTotal
            };
            return reserva;
        }

        
    }
}
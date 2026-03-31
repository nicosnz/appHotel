using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Dtos;
using backend.Repositories.Huespedes;
using Npgsql.Replication;
using backend.Models;
namespace backend.Services.Huespedes
{
    public class CrearHuesped
    {
        private readonly IHuespedRepository huespedRepository;

        public CrearHuesped(IHuespedRepository huespedRepository)
        {
            this.huespedRepository = huespedRepository;
        }

        public async Task<Guid> Crear(HuespedCreateDto nuevoHuesped)
        {
            if(nuevoHuesped.Documento.Length != 7)
            {
                throw new InvalidOperationException("El documento debe de ser de 7 caracteres");
            }
            var huespedEnDb = await huespedRepository.GetByDocumento(nuevoHuesped.Documento);
            if (huespedEnDb != null)
            {
                throw new InvalidOperationException("Este usuario ya existe");
            }
            var huesped = Huesped.Crear(nuevoHuesped.Nombre,nuevoHuesped.Apellido,nuevoHuesped.Documento,nuevoHuesped.Genero);
            var id = await huespedRepository.Add(huesped);
            return id;
            
        }
    }
}
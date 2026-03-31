# 🏨 Hotel Nicosan - Sistema de Gestión 

![GitHub repo size](https://img.shields.io/github/repo-size/tu-usuario/hotel-nicosan?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/tu-usuario/hotel-nicosan?style=for-the-badge&color=6366f1)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

**Hotel Nicosan** es un prototipo de aplicación web moderna diseñada para la administración integral de servicios hoteleros. El sistema permite gestionar desde la recepción de huéspedes hasta el control administrativo de empleados y disponibilidad de habitaciones en tiempo real.

---

## ✨ Características Principales

* **📊 Dashboard Inteligente:** Panel principal con un reloj digital gigante, fecha actual y saludo dinámico para facilitar la gestión del tiempo en recepción.
* **👥 Gestión de Huéspedes:** Registro de nuevos clientes, actualización de estados (Activo/Inactivo) y búsqueda por documento.
* **📅 Control de Reservas:** Creación de reservas con validación de fechas, cálculo de precio total y gestión de estados (Pendiente, Confirmada, Cancelada).
* **🔑 Check-in :** Flujo simplificado para registrar la entrada.
* **🏨 Catálogo de Habitaciones:** Visualización detallada de habitaciones por piso, tipo de cama y estado de limpieza/ocupación.
* **👷 Gestión de Personal:** Administración de empleados y asignación de turnos (Mañana, Tarde, Noche).

---

## 🛠️ Stack Tecnológico

El proyecto utiliza una arquitectura desacoplada para garantizar escalabilidad y mantenimiento:

| Capa | Tecnología |
| :--- | :--- |
| **Frontend** | TypeScript, Web Components (Vanilla), CSS Moderno (Flex/Grid) |
| **Backend** | .NET 10 / C# |
| **Arquitectura** | MVC / Patron Repository  |
| **Persistencia** | Entity Framework Core /PostgreSQL|
| **Comunicación** | API REST / DTOs |

---

## 📐 Estructura del Sistema (UML)

El backend está diseñado bajo contratos estrictos mediante interfaces. Algunos de los servicios clave son:

### IReservaService
- `+ Add(reservaNueva: Reserva): Task<Guid>`
- `+ UpdateEstadoReserva(Id: Guid, estadoNuevo: String): Task`
- `+ UpdateMora(Id: Guid, mora: Decimal): Task`

### IHabitacionService
- `+ UpdateEstadoHabitacion(Id: Guid, estadoNuevo: String): Task`
- `+ GetHabitacionesDisponibles(fechaInicio: DateOnly, fechaFin: DateOnly): Task<List<Habitacion>>`

---

## 🚀 Instalación y Configuración

Sigue estos pasos para ejecutar el proyecto localmente:

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/tu-usuario/hotel-nicosan.git](https://github.com/tu-usuario/hotel-nicosan.git)
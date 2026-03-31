import { getHabitaciones } from "../services/Habitaciones/HabitacionesRepository";
import { EstadoHabitacion } from "../services/Habitaciones/HabitacionResponse";
import type { Habitacion} from "../services/Habitaciones/HabitacionResponse";




export class Habitaciones extends HTMLElement {
    private allRooms: Habitacion[] = [];

    constructor() {
        super();
    }

    async connectedCallback() {
        this.render();
        this.initEvents();
        await this.loadRooms();
    }

    /**
     * Carga de datos desde el repositorio de Axios
     */
    private async loadRooms() {
        const tbody = this.querySelector('.rooms__table-body');
        try {
            if (tbody) tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 2rem;">Cargando habitaciones...</td></tr>`;
            
            this.allRooms = await getHabitaciones();
            this.renderTable(this.allRooms);
        } catch (error) {
            console.error("Error al cargar habitaciones:", error);
            if (tbody) tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:red; padding: 2rem;">Error al conectar con el servidor.</td></tr>`;
        }
    }

    /**
     * Renderiza las filas en el cuerpo de la tabla
     */
    private renderTable(rooms: Habitacion[]) {
        const tbody = this.querySelector('.rooms__table-body');
        const info = this.querySelector('.rooms__pagination-info');
        if (!tbody) return;

        if (rooms.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 2rem;">No se encontraron habitaciones.</td></tr>`;
            if (info) info.textContent = "Mostrando 0 habitaciones";
            return;
        }

        tbody.innerHTML = rooms.map(room => this.createRowHTML(room)).join('');
        
        if (info) {
            info.textContent = `Mostrando ${rooms.length} de ${this.allRooms.length} habitaciones`;
        }
    }

    /**
     * Crea el HTML para una fila individual con limpieza de guiones
     */
    private createRowHTML(room: Habitacion): string {
        const isLibre = room.estadoHabitacion === EstadoHabitacion.Libre;
        const badgeClass = isLibre ? 'rooms__badge--free' : 'rooms__badge--occupied';
        
        // Quitamos el guion bajo del tipo de habitación para que se vea mejor
        const tipoLimpio = room.tipoHabitacion.replace('_', ' ');
        
        // Clase para el tag (usamos la primera palabra para el color)
        const typeBaseClass = `rooms__type-tag--${room.tipoHabitacion.split('_')[0].toLowerCase()}`;

        return `
            <tr class="rooms__table-row">
                <td class="rooms__table-td">
                    <div class="rooms__room-info">
                        <div class="rooms__room-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                                <polyline points="9 22 9 12 15 12 15 22"/>
                            </svg>
                        </div>
                        <span class="rooms__room-name">Hab. ${room.numHabitacion}</span>
                    </div>
                </td>
                <td class="rooms__table-td" style="text-align: center;">${room.capacidadPersonas}</td>
                <td class="rooms__table-td">
                    <span class="rooms__type-tag ${typeBaseClass}">${tipoLimpio}</span>
                </td>
                <td class="rooms__table-td">${room.piso}</td>
                <td class="rooms__table-td rooms__table-td--price">$${room.precio.toFixed(2)}</td>
                <td class="rooms__table-td">
                    <span class="rooms__badge ${badgeClass}">${room.estadoHabitacion}</span>
                </td>
            </tr>
        `;
    }

    private initEvents() {
        // Buscador por número o tipo
        this.querySelector('.rooms__search-input')?.addEventListener('input', (e) => {
            const term = (e.target as HTMLInputElement).value.toLowerCase();
            const filtered = this.allRooms.filter(r => 
                r.numHabitacion.includes(term) || 
                r.tipoHabitacion.toLowerCase().includes(term)
            );
            this.renderTable(filtered);
        });

        // Filtros de estado (Botones)
        this.querySelectorAll('.rooms__filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.querySelectorAll('.rooms__filter-btn').forEach(b => b.classList.remove('rooms__filter-btn--active'));
                btn.classList.add('rooms__filter-btn--active');

                const filter = btn.getAttribute('data-filter');
                if (filter === 'todas') {
                    this.renderTable(this.allRooms);
                } else if (filter === 'libres') {
                    this.renderTable(this.allRooms.filter(r => r.estadoHabitacion === EstadoHabitacion.Libre));
                } else if (filter === 'ocupadas') {
                    this.renderTable(this.allRooms.filter(r => r.estadoHabitacion !== EstadoHabitacion.Libre));
                }
            });
        });
    }

    private render() {
        this.innerHTML = `
            <main class="container">
                <section class="rooms">
                    <div class="rooms__header">
                        <div class="rooms__title-group">
                            <h1 class="rooms__title">Lista de Habitaciones</h1>
                            <p class="rooms__subtitle">Administra el estado y disponibilidad de cada habitación en tiempo real</p>
                        </div>
                    </div>
                
                    <div class="rooms__filters">
                        <button class="rooms__filter-btn rooms__filter-btn--active" data-filter="todas">Todas las habitaciones</button>
                        <button class="rooms__filter-btn" data-filter="libres">Habitaciones libres</button>
                        <button class="rooms__filter-btn" data-filter="ocupadas">Habitaciones ocupadas</button>
                
                        <div class="rooms__search">
                            <svg class="rooms__search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            </svg>
                            <input class="rooms__search-input" type="text" placeholder="Buscar habitación..." aria-label="Buscar habitación" />
                        </div>
                    </div>
                
                    <div class="rooms__table-wrapper">
                        <table class="rooms__table">
                            <thead class="rooms__table-head">
                                <tr>
                                    <th class="rooms__table-th">Nombre</th>
                                    <th class="rooms__table-th">Capacidad</th>
                                    <th class="rooms__table-th">Tipo de habitación</th>
                                    <th class="rooms__table-th">Piso</th>
                                    <th class="rooms__table-th">Precio por noche</th>
                                    <th class="rooms__table-th">Estado</th>
                                </tr>
                            </thead>
                            <tbody class="rooms__table-body">
                                </tbody>
                        </table>
                    </div>
                
                    <div class="rooms__pagination">
                        <p class="rooms__pagination-info">Cargando...</p>
                    </div>
                </section>
            </main>
        `;
    }
}

customElements.define("app-habitaciones", Habitaciones);
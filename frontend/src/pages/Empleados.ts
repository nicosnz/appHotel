import { getEmpleados } from "../services/Empleados/EmpleadosRepository";
import type { EmpleadoResponse } from '../services/Empleados/EmpleadosResponse';



export class Empleados extends HTMLElement {
    private listaEmpleados: EmpleadoResponse[] = [];

    constructor() {
        super();
    }

    async connectedCallback() {
        this.renderBase();
        await this.cargarEmpleados();
        this.configurarEventosModales();
    }

    private renderBase() {
        this.innerHTML = `
            <main class="container">
                <section class="employees">
                    <div class="employees__header">
                        <div class="employees__title-group">
                            <h1 class="employees__title">Lista de Empleados</h1>
                            <p class="employees__subtitle">Gestiona el personal activo e inactivo del hotel</p>
                        </div>
                    </div>
                    <div class="employees__filters">
                        <button class="employees__filter-btn employees__filter-btn--active" data-filter="todos">Todos</button>
                    </div>
                    <div class="employees__table-wrapper">
                        <table class="employees__table">
                            <thead class="employees__table-head">
                                <tr>
                                    <th class="employees__table-th">Empleado</th>
                                    <th class="employees__table-th">Cargo</th>
                                    <th class="employees__table-th">Turno</th>
                                    <th class="employees__table-th">Documento</th>
                                    <th class="employees__table-th">Estado</th>
                                </tr>
                            </thead>
                            <tbody class="employees__table-body" id="employeesBody">
                                </tbody>
                        </table>
                    </div>
                </section>
            </main>

            <div class="modal-overlay hidden" id="detailModal">
                </div>
        `;
    }

    private async cargarEmpleados() {
        const tbody = this.querySelector('#employeesBody');
        if (!tbody) return;

        try {
            this.listaEmpleados = await getEmpleados();
            this.renderizarTabla(this.listaEmpleados);
        } catch (error) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">Error al cargar datos.</td></tr>';
        }
    }

    private renderizarTabla(empleados: EmpleadoResponse[]) {
        const tbody = this.querySelector('#employeesBody') as HTMLElement;
        if (!tbody) return;
        const nombresTurnos: Record<string, string> = {
            'MANANA': 'Mañana',
            'TARDE': 'Tarde',
            'NOCHE': 'Noche'
        };
        if (empleados.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; padding: 50px 20px;">
                        <div style="display: flex; flex-direction: column; align-items: center; gap: 10px; color: #64748b;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <line x1="23" y1="11" x2="17" y2="11"></line>
                            </svg>
                            <p style="font-size: 1.1rem; font-weight: 500;">No hay empleados registrados</p>
                            <p style="font-size: 0.9rem;">Actualmente no existe personal en la base de datos.</p>
                        </div>
                    </td>
                </tr>
            `;
            return;
        }
        
        tbody.innerHTML = empleados.map(emp => {
            const iniciales = `${emp.nombre[0]}${emp.apellido[0]}`.toUpperCase();
            const estadoClase = emp.activo ? 'active' : 'inactive';
            const estadoTexto = emp.activo ? 'Activo' : 'Inactivo';
            const turnoLegible = nombresTurnos[emp.turnoEmpleado] || emp.turnoEmpleado;
            
            return `
                <tr class="employees__table-row" style="cursor: pointer;" data-id="${emp.id}">
                    <td class="employees__table-td">
                        <div class="employees__emp-info">
                            <div class="employees__avatar" style="background: #335c67; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; border-radius: 50%; width: 35px; height: 35px;">
                                ${iniciales}
                            </div>
                            <div>
                                <p class="employees__emp-name">${emp.nombre} ${emp.apellido}</p>
                                <p class="employees__emp-email">${emp.nombre.toLowerCase()}@hotel.com</p>
                            </div>
                        </div>
                    </td>
                    <td class="employees__table-td">
                        <span class="employees__role-tag employees__role-tag--${emp.tipoEmpleado.toLowerCase()}">${emp.tipoEmpleado}</span>
                    </td>
                    <td class="employees__table-td">${turnoLegible}</td>
                    <td class="employees__table-td">${emp.documento}</td>
                    <td class="employees__table-td">
                        <span class="employees__badge employees__badge--${estadoClase}">${estadoTexto}</span>
                    </td>
                </tr>
            `;
        }).join('');

        // Agregar evento para abrir detalle al hacer clic en la fila
        this.querySelectorAll('.employees__table-row').forEach(row => {
            row.addEventListener('click', () => {
                const id = (row as HTMLElement).dataset.id;
                const emp = this.listaEmpleados.find(e => e.id === id);
                if (emp) this.abrirDetalle(emp);
            });
        });
    }

    private abrirDetalle(emp: EmpleadoResponse) {
        const modal = this.querySelector('#detailModal') as HTMLElement;
        // Inyectar datos en los IDs que ya tienes en tu modal
        (this.querySelector('#modalTitle') as HTMLElement).textContent = `${emp.nombre} ${emp.apellido}`;
        (this.querySelector('#modalNombre') as HTMLElement).textContent = `${emp.nombre} ${emp.apellido}`;
        (this.querySelector('#modalDni') as HTMLElement).textContent = emp.documento;
        (this.querySelector('#modalCargo') as HTMLElement).textContent = emp.tipoEmpleado;
        (this.querySelector('#modalTurno') as HTMLElement).textContent = emp.turnoEmpleado;
        (this.querySelector('#modalStatus') as HTMLElement).textContent = emp.activo ? 'Activo' : 'Inactivo';
        
        modal.classList.remove('hidden');
    }

    private configurarEventosModales() {
        const modal = this.querySelector('#detailModal') as HTMLElement;
        this.querySelector('#closeModal')?.addEventListener('click', () => modal.classList.add('hidden'));
        this.querySelector('#closeModalFooter')?.addEventListener('click', () => modal.classList.add('hidden'));
    }
}

customElements.define("app-empleados", Empleados);
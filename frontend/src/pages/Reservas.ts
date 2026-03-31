import { getHabitacionesDisponibles } from "../services/Habitaciones/HabitacionesRepository";
import { getHuespedesInactivos} from "../services/Huespedes/HuespedesRepository";
import type { ReservaCreateDTO, ReservaResponse } from "../services/Reservas/Reservas.interfaces";
import { cancelarReserva, crearReserva, getReservasPorEstado, getTodasLasReservas, realizarCheckIn } from "../services/Reservas/ReservasRepository";

export class Reservas extends HTMLElement{
    private selectedGuestIds: string[] = [];
    private reservasActuales:ReservaResponse[] = [];
    constructor(){
        super()
    };

    async connectedCallback():Promise<void>{
        this.innerHTML = `
            <main class="container">
    
                    <section class="reservations">
                
                    <!-- ===== CABECERA ===== -->
                    <div class="reservations__header">
                        <div class="reservations__title-group">
                        <h1 class="reservations__title">Lista de Reservas</h1>
                        <p class="reservations__subtitle">Consulta y gestiona todas las reservas del hotel</p>
                        </div>
                        <button class="reservations__add-btn">
                            <span class="reservations__add-btn-icon">+</span>
                            <span>Nueva reserva</span>
                        </button>
                    </div>
                
                    <!-- ===== FILTROS ===== -->
                    <div class="reservations__controls" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; gap: 15px; flex-wrap: wrap;">
    
                        <div class="reservations__filters" style="display: flex; gap: 10px;">
                            <button class="reservations__filter-btn reservations__filter-btn--active" data-filter="TODAS">Todas</button>
                            <button class="reservations__filter-btn" data-filter="ACEPTADA">Aceptadas</button>
                            <button class="reservations__filter-btn" data-filter="EN_PROCESO">En Proceso</button>
                            <button class="reservations__filter-btn" data-filter="TERMINADA">Terminadas</button>
                            <button class="reservations__filter-btn" data-filter="CANCELADA">Canceladas</button>
                        </div>

                        <div class="reservations__search-container" style="position: relative; flex: 1; max-width: 400px;">
                            <svg style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #94a3b8;" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            <input type="text" id="reservaSearch" placeholder="Buscar por huésped" 
                                style="width: 100%; padding: 10px 10px 10px 40px; border: 1px solid #e2e8f0; border-radius: 8px; outline: none; transition: border-color 0.2s;">
                        </div>
                    </div>
                
                    <!-- ===== TABLA ===== -->
                    <div class="reservations__table-wrapper">
                        <table class="reservations__table">
                        <thead class="reservations__table-head">
                            <tr>
                                <th class="reservations__table-th">Titular</th>
                                <th class="reservations__table-th">Entrada Esperada</th>
                                <th class="reservations__table-th">Salida esperada</th>
                                <th class="reservations__table-th">Precio total</th>
                                <th class="reservations__table-th">Estado</th>
                                <th class="reservations__table-th reservations__table-th--actions">Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="reservations__table-body">
                
                            
                
                        </tbody>
                        </table>
                    </div>
                
                    
                    </section>
            </main>
            
            <!-- ===== MODAL DE DETALLE ===== -->
            <div class="modal-overlay hidden" id="detailModal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
                <div class="modal">
            
                <div class="modal__header">
                    <div>
                    <p class="modal__label">Detalle de reserva</p>
                    <h2 class="modal__title" id="modalTitle">Reserva #<span id="modalId"></span></h2>
                    </div>
                    <button class="modal__close" id="closeModal" aria-label="Cerrar">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                </div>
            
                <!-- Estado badge en modal -->
                <div class="modal__status-row">
                    <span class="modal__status-badge" id="modalStatus"></span>
                    <span class="modal__id-text">ID: <code id="modalUuid"></code></span>
                </div>
            
                <!-- Secciones de detalle -->
                <div class="modal__body">
            
                    <!-- Titular -->
                    <div class="modal__section">
                    <h3 class="modal__section-title">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        Titular
                    </h3>
                    <div class="modal__info-grid">
                        <div class="modal__info-item">
                        <span class="modal__info-label">Nombre</span>
                        <span class="modal__info-value" id="modalTitular"></span>
                        </div>
                        <div class="modal__info-item">
                        <span class="modal__info-label">Documento</span>
                        <span class="modal__info-value" id="modalDocumento"></span>
                        </div>
                    </div>
                    </div>
            
                    <!-- Huéspedes -->
                    <div class="modal__section">
                    <h3 class="modal__section-title">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        Huéspedes (<span id="modalGuestCount"></span>)
                    </h3>
                    <ul class="modal__guest-list" id="modalGuestList"></ul>
                    </div>
            
                    <!-- Habitación -->
                    <div class="modal__section">
                    <h3 class="modal__section-title">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                        Habitación
                    </h3>
                    <div class="modal__info-grid">
                        <div class="modal__info-item">
                            <span class="modal__info-label">Número</span>
                            <span class="modal__info-value" id="modalRoom"></span>
                        </div>
                        <div class="modal__info-item">
                            <span class="modal__info-label">Tipo</span>
                            <span class="modal__info-value" id="modalRoomType"></span>
                        </div>
                        <div class="modal__info-item">
                            <span class="modal__info-label">Piso</span>
                            <span class="modal__info-value" id="modalFloor"></span>
                        </div>
                        <div class="modal__info-item">
                            <span class="modal__info-label">Precio/noche</span>
                            <span class="modal__info-value" id="modalNightPrice"></span>
                        </div>
                    </div>
                    </div>
            
                    <!-- Fechas -->
                    <div class="modal__section">
                    <h3 class="modal__section-title">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                        Fechas
                    </h3>
                    <div class="modal__info-grid">
                        <div class="modal__info-item">
                            <span class="modal__info-label">Fecha de entrada</span>
                            <span class="modal__info-value" id="modalFechaInicio"></span>
                        </div>
                        <div class="modal__info-item">
                            <span class="modal__info-label">Salida esperada</span>
                            <span class="modal__info-value" id="modalFechaSalida"></span>
                        </div>
                        <div class="modal__info-item">
                            <span class="modal__info-label">Entrada real</span>
                            <span class="modal__info-value" id="modalFechaActualEntrada"></span>
                        </div>
                        <div class="modal__info-item">
                            <span class="modal__info-label">Salida real</span>
                            <span class="modal__info-value" id="modalFechaActualSalida"></span>
                        </div>
                    </div>
                    </div>
            
                    <!-- Financiero -->
                    <div class="modal__section">
                    <h3 class="modal__section-title">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                        Resumen financiero
                    </h3>
                    <div class="modal__finance-grid">
                        <div class="modal__finance-card">
                            <span class="modal__finance-label">Precio total</span>
                            <span class="modal__finance-value modal__finance-value--total" id="modalPrecioTotal"></span>
                        </div>
                        <div class="modal__finance-card modal__finance-card--mora" id="moraCard">
                            <span class="modal__finance-label">Mora acumulada</span>
                            <span class="modal__finance-value modal__finance-value--mora" id="modalMora"></span>
                        </div>
                    </div>
                    </div>
            
                </div><!-- /modal__body -->
            
                <div class="modal__footer">
                    <button class="modal__btn modal__btn--secondary" id="closeModalFooter">Cerrar</button>
                    <button class="modal__btn modal__btn--primary">Editar reserva</button>
                </div>
            
                </div>
            </div>


            <div class="modal-overlay hidden" id="createReservationModal" role="dialog" aria-modal="true">
                <div class="modal modal--large">
                    <div class="modal__header">
                        <div>
                            <p class="modal__label">Gestión de Estancia</p>
                            <h2 class="modal__title">Nueva Reserva</h2>
                        </div>
                        <button class="modal__close" id="closeCreateModal">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                    </div>

                    <div class="modal__body">
                        <form id="reservationForm" class="modal__form">
                            <div class="modal__section">
                                <h3 class="modal__section-title">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                                    Huéspedes Disponibles
                                </h3>
                                
                                

                                <div class="modal__guest-selection-grid" id="guestSelectContainer">
                                </div>
                                <p class="modal__help-text">Selecciona uno o más huéspedes para la reserva.</p>
                            </div>

                            <div class="modal__section">
                                <h3 class="modal__section-title">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                                    Periodo de Estancia
                                </h3>
                                <div class="modal__info-grid">
                                    <div class="modal__info-item">
                                        <label class="modal__info-label" for="checkIn">Fecha de Entrada</label>
                                        <input type="date" id="checkIn" class="modal__input">
                                    </div>
                                    <div class="modal__info-item">
                                        <label class="modal__info-label" for="checkOut">Fecha de Salida</label>
                                        <input type="date" id="checkOut" class="modal__input">
                                    </div>
                                </div>
                            </div>

                            <div class="modal__section hidden" id="availableRoomsSection">
                                <h3 class="modal__section-title">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
                                    Habitaciones Disponibles
                                </h3>
                                <div class="modal__room-grid" id="roomsContainer">
                                    </div>
                            </div>
                        </form>
                    </div>

                    <div class="modal__footer">
                        <button class="modal__btn modal__btn--secondary" id="cancelCreate">Cancelar</button>
                        <button class="modal__btn modal__btn--primary" id="saveReservation" disabled>Confirmar Reserva</button>
                    </div>
                </div>
            </div>

        <div id="toast-container" class="toast-container"></div>

        <style>
            .toast-container {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .toast {
                min-width: 250px;
                padding: 16px;
                border-radius: 8px;
                color: white;
                font-family: sans-serif;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                display: flex;
                align-items: center;
                justify-content: space-between;
                animation: slideIn 0.3s ease forwards;
            }

            .toast--success { background-color: #2ecc71; border-left: 5px solid #27ae60; }
            .toast--error { background-color: #e74c3c; border-left: 5px solid #c0392b; }

            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }

            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        </style>

        
        
        `;
        await this.cargarHuespedesInactivos();
        this.formulario();
        await this.cargarTablaReservas();

    };
    private async cargarHuespedesInactivos(): Promise<void> {
        const container = this.querySelector('#guestSelectContainer') as HTMLElement;
        
        try {
            const inactivos = await getHuespedesInactivos();
            
            if (inactivos.length === 0) {
                container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 20px;">No hay huéspedes disponibles.</p>`;
                return;
            }

            container.innerHTML = inactivos.map(h => {
                const iniciales = `${h.nombre[0]}${h.apellido[0]}`.toUpperCase();
                return `
                    <div class="guest-card" data-id="${h.id}">
                        <div class="guest-card__avatar" style="background-color: var(--color-primary, #335c67)">
                            ${iniciales}
                        </div>
                        <div class="guest-card__info">
                            <span class="guest-card__name">${h.nombre} ${h.apellido}</span>
                            <span class="guest-card__dni">DNI: ${h.documento || '---'}</span>
                        </div>
                    </div>
                `;
            }).join('');

            // Asignar eventos de selección
            this.asignarEventosInvitados(container);

        } catch (error) {
            container.innerHTML = `<p style="color: red;">Error al cargar datos.</p>`;
        }
    }

    private asignarEventosInvitados(container: HTMLElement): void {
        const cards = container.querySelectorAll('.guest-card');
            cards.forEach(card => {
                card.addEventListener('click', () => {
                    card.classList.toggle('selected');
                    // Aquí puedes guardar los IDs seleccionados en una variable de clase
                    this.actualizarIdsSeleccionados();
                });
            });
    }
    private async cargarTablaReservas(): Promise<void> {
        try {
            this.reservasActuales = await getTodasLasReservas();
            this.renderizarTabla(this.reservasActuales);
        } catch (error) {
            this.showToast("Error al cargar la lista", "error");
        }
    }
    private abrirModalDetalle(reserva: any): void {
        const modal = this.querySelector('#detailModal') as HTMLElement;
        
        // Llenar datos básicos
        (this.querySelector('#modalId') as HTMLElement).textContent = reserva.id.substring(0, 8);
        (this.querySelector('#modalUuid') as HTMLElement).textContent = reserva.id;
        
        const statusBadge = this.querySelector('#modalStatus') as HTMLElement;
        statusBadge.textContent = reserva.estadoReserva;
        statusBadge.className = `modal__status-badge reservations__badge--${reserva.estadoReserva.toLowerCase()}`;

        // Titular y Huéspedes
        (this.querySelector('#modalTitular') as HTMLElement).textContent = `${reserva.huespedes[0].nombre} ${reserva.huespedes[0].apellido || ''}`;
        (this.querySelector('#modalDocumento') as HTMLElement).textContent = `${reserva.huespedes[0].documento}`;
        (this.querySelector('#modalGuestCount') as HTMLElement).textContent = reserva.huespedes.length.toString();
        
        const listHuespedes = this.querySelector('#modalGuestList') as HTMLElement;
        listHuespedes.innerHTML = reserva.huespedes.map((h: any) => `
            <li style="padding: 8px 0; border-bottom: 1px solid #eee; display: flex; justify-content: space-between;">
                <span>${h.nombre} ${h.apellido || ''}</span>
                <small style="color: #666;">DNI: ${h.documento || 'N/A'}</small>
            </li>
        `).join('');

        // Habitación y Fechas
        (this.querySelector('#modalRoom') as HTMLElement).textContent = `Habitación ${reserva.habitacion.numHabitacion || ''}`;
        (this.querySelector('#modalRoomType') as HTMLElement).textContent = reserva.habitacion.tipoHabitacion;
        (this.querySelector('#modalFloor') as HTMLElement).textContent = reserva.habitacion.piso;
        (this.querySelector('#modalNightPrice') as HTMLElement).textContent = reserva.habitacion.precio;
        (this.querySelector('#modalFechaInicio') as HTMLElement).textContent = new Date(reserva.fechaCheckInEsperado).toLocaleDateString();
        (this.querySelector('#modalFechaSalida') as HTMLElement).textContent = new Date(reserva.fechaCheckOutEsperado).toLocaleDateString();
        (this.querySelector('#modalFechaActualEntrada') as HTMLElement).textContent =
            reserva.fechaCheckInActual
                ? new Date(reserva.fechaCheckInActual).toLocaleDateString()
                : "Sin fecha";

            (this.querySelector('#modalFechaActualSalida') as HTMLElement).textContent =
            reserva.fechaCheckOutActual
                ? new Date(reserva.fechaCheckOutActual).toLocaleDateString()
                : "Sin fecha";
        (this.querySelector('#modalPrecioTotal') as HTMLElement).textContent = `$${reserva.precioTotal.toFixed(2)}`;
        (this.querySelector('#modalMora') as HTMLElement).textContent = `$${reserva.mora.toFixed(2)}`;

        // Configurar Botones del Footer
        const footer = modal.querySelector('.modal__footer') as HTMLElement;
        footer.innerHTML = `
            <button class="modal__btn modal__btn--secondary" id="btnCerrarDetalle">Cerrar</button>
            <button class="modal__btn" style="background-color: #d63031; color: white;" id="btnCancelarReserva">Cancelar Reserva</button>
            <button class="modal__btn modal__btn--primary" id="btnCheckIn">Realizar Check-In</button>
        `;

        // Eventos de los botones
        modal.querySelector('#btnCerrarDetalle')?.addEventListener('click', () => modal.classList.add('hidden'));
        
        const btnCancelar = modal.querySelector('#btnCancelarReserva') as HTMLButtonElement;

        // Validación: No permitir cancelar si ya está CANCELADA o TERMINADA
        if (reserva.estadoReserva === 'CANCELADA' || reserva.estadoReserva === 'TERMINADA') {
            btnCancelar.style.display = 'none'; // Ocultamos el botón si no aplica
        }

        btnCancelar.addEventListener("click",async () => {
            // 1. Confirmación de seguridad
            const confirmar = confirm(`¿Estás seguro de que deseas cancelar la reserva de ${reserva.huespedes[0].nombre}?`);
            
            if (!confirmar) return;

            try {
                btnCancelar.disabled = true;
                btnCancelar.textContent = 'Cancelando...';

                // 2. Llamada al servicio
                await cancelarReserva(reserva.id);

                // 3. Formato de fecha y hora para el Toast
                const ahora = new Date();
                const fechaHora = ahora.toLocaleString('es-ES', {
                    day: '2-digit', month: '2-digit', year: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                });

                this.showToast(`Reserva cancelada el ${fechaHora} hs.`, 'success');

                // 4. Cerrar y Refrescar
                modal.classList.add('hidden');
                await this.cargarTablaReservas();

            } catch (error: any) {
                this.showToast(error.message, 'error');
            } finally {
                btnCancelar.disabled = false;
                btnCancelar.textContent = 'Cancelar Reserva';
            }
        });
        const btnCheckIn = modal.querySelector('#btnCheckIn') as HTMLButtonElement;

    // Solo habilitar el botón si la reserva está en estado ACEPTADA
        if (reserva.estadoReserva !== 'ACEPTADA') {
            btnCheckIn.disabled = true;
            btnCheckIn.style.opacity = '0.5';
            btnCheckIn.style.cursor = 'not-allowed';
            btnCheckIn.title = "Solo se puede hacer check-in en reservas aceptadas";
        }

        btnCheckIn.addEventListener('click', async() => {
            try {
                btnCheckIn.disabled = true;
                btnCheckIn.textContent = 'Procesando...';

                // 1. Llamada al servidor
                await realizarCheckIn(reserva.id);

                // 2. Feedback visual
                    const ahora = new Date();
                    const fechaLegible = ahora.toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    });
                    const horaLegible = ahora.toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false // Cambia a true si prefieres formato AM/PM
                    });

                    // 3. Mostrar Toast con información detallada
                    this.showToast(
                        `¡Check-In realizado! - ${fechaLegible} a las ${horaLegible} hs`, 
                        'success'
                    );
                modal.classList.add('hidden');
                await this.cargarTablaReservas(); 

            } catch (error: any) {
                this.showToast(error.message, 'error');
            } finally {
                btnCheckIn.disabled = false;
                btnCheckIn.textContent = 'Realizar Check-In';
            }            
        });

        modal.classList.remove('hidden');
    }
    private getRandomColor(): string {
        const colors = ['#335c67', '#e09f3e', '#9e2a2b', '#540b0e', '#2a9d8f', '#264653', '#6d597a'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    private actualizarIdsSeleccionados(): void {
    // 1. Buscamos todas las cards que el usuario marcó
        const selectedCards = this.querySelectorAll('.guest-card.selected');
        
        // 2. Mapeamos para obtener solo los IDs (convertidos a string o number según tu API)
        this.selectedGuestIds = Array.from(selectedCards).map(card => {
            return (card as HTMLElement).dataset.id || '';
        });

        // 3. Log opcional para depuración (puedes quitarlo después)
        console.log('Huéspedes seleccionados actualmente:', this.selectedGuestIds);

        
        this.validarFormulario();
    }
    private validarFormulario(): void {
        const btnSave = this.querySelector('#saveReservation') as HTMLButtonElement;
        const roomsContainer = this.querySelector('#roomsContainer') as HTMLElement;
        
        // Verificamos si hay huéspedes
        const tieneHuespedes = this.selectedGuestIds.length > 0;
        
        // Verificamos si hay habitación (usando el dataset que definimos antes)
        const tieneHabitacion = roomsContainer.dataset.selectedId !== undefined;

        // Solo habilitar si cumple ambas condiciones
        if (btnSave) {
            btnSave.disabled = !(tieneHuespedes && tieneHabitacion);
        }
    }
    private async ejecutarGuardado(): Promise<void> {
        const btnSave = this.querySelector('#saveReservation') as HTMLButtonElement;
        
        // 1. Recolectar datos
        const payload: ReservaCreateDTO = {
            HuespedesIds: this.selectedGuestIds, // El array que ya manejas
            HabitacionId: (this.querySelector('#roomsContainer') as HTMLElement).dataset.selectedId || '',
            FechaCheckInEsperado: (this.querySelector('#checkIn') as HTMLInputElement).value,
            FechaCheckOutEsperado: (this.querySelector('#checkOut') as HTMLInputElement).value
        };

        try {
            btnSave.disabled = true;
            btnSave.textContent = 'Procesando...';

            await crearReserva(payload);
            
            this.showToast(`Reserva creada con éxito.`, 'success');
            this.cerrarModal();
            await this.cargarTablaReservas();
            
        } catch (error: any) {
            this.showToast(error.message || 'Error al crear la reserva', 'error');
        } finally {
            btnSave.disabled = false;
            btnSave.textContent = 'Confirmar Reserva';
        }
    }
    private showToast(mensaje: string, tipo: 'success' | 'error' = 'success'): void {
        const container = this.querySelector('#toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast--${tipo}`;
        toast.innerHTML = `
            <span>${mensaje}</span>
            <button style="background:none; border:none; color:white; cursor:pointer; margin-left:10px;">✕</button>
        `;

        container.appendChild(toast);

        // Auto eliminar después de 4 segundos
        const timer = setTimeout(() => {
            toast.style.animation = 'fadeOut 0.5s ease forwards';
            toast.addEventListener('animationend', () => toast.remove());
        }, 4000);

        // Botón cerrar manual
        toast.querySelector('button')?.addEventListener('click', () => {
            clearTimeout(timer);
            toast.remove();
        });
    }
    

    private cerrarModal(): void {
        const modal = this.querySelector('#createReservationModal') as HTMLElement;
        modal.classList.add('hidden');
        (this.querySelector('#reservationForm') as HTMLFormElement)?.reset();
        this.selectedGuestIds = [];
        const roomsContainer = this.querySelector('#roomsContainer') as HTMLElement;
        delete roomsContainer.dataset.selectedId;
    }

    public formulario(): void {
        // Usamos this.querySelector para asegurar que buscamos DENTRO del componente
        const btnAdd = this.querySelector('.reservations__add-btn') as HTMLButtonElement;
        const createModal = this.querySelector('#createReservationModal') as HTMLElement;
        const btnClose = this.querySelector('#closeCreateModal') as HTMLButtonElement;
        const btnCancel = this.querySelector('#cancelCreate') as HTMLButtonElement;
        const btnSave = this.querySelector('#saveReservation') as HTMLButtonElement;
        
        const checkIn = this.querySelector('#checkIn') as HTMLInputElement;
        const checkOut = this.querySelector('#checkOut') as HTMLInputElement;
        const roomsSection = this.querySelector('#availableRoomsSection') as HTMLElement;
        const roomsContainer = this.querySelector('#roomsContainer') as HTMLElement;

        // --- ABRIR Y CERRAR ---
        btnAdd?.addEventListener('click', () => createModal.classList.remove('hidden'));
        
        const cerrar = () => this.cerrarModal();
        btnClose?.addEventListener('click', cerrar);
        btnCancel?.addEventListener('click', cerrar);

        // --- ACCIÓN DE GUARDAR ---
        btnSave?.addEventListener('click', () => this.ejecutarGuardado());

        // --- LÓGICA DE HABITACIONES DISPONIBLES ---
        const manejarCambioFecha = async () => {
            const fechaInicio = checkIn.value;
            const fechaFin = checkOut.value;

            if (fechaInicio && fechaFin) {
                roomsSection.classList.remove('hidden');
                roomsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Buscando habitaciones...</p>';
                
                try {
                    const habitaciones = await getHabitacionesDisponibles(fechaInicio, fechaFin);
                    
                    if (habitaciones.length === 0) {
                        roomsContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No hay habitaciones para estas fechas.</p>';
                        return;
                    }

                    roomsContainer.innerHTML = habitaciones.map(room => `
                        <div class="room-card" data-id="${room.id}">
                            <div class="room-card__header"><strong>Hab. ${room.numHabitacion}</strong></div>
                            <div class="room-card__body">
                                <small>${room.tipoHabitacion || 'Estándar'}</small><br>
                                <span>$${room.precio}</span>
                            </div>
                        </div>
                    `).join('');

                    this.asignarEventosHabitaciones(roomsContainer);

                } catch (error) {
                    roomsContainer.innerHTML = '<p style="color: red;">Error al cargar habitaciones.</p>';
                }
            }
        };
        // Dentro de tu método formulario() añade esto:
        const detailModal = this.querySelector('#detailModal') as HTMLElement;
        const btnCloseDetail = this.querySelector('#closeModal') as HTMLButtonElement;
        const btnCloseFooter = this.querySelector('#closeModalFooter') as HTMLButtonElement;

        btnCloseDetail?.addEventListener('click', () => detailModal.classList.add('hidden'));
        btnCloseFooter?.addEventListener('click', () => detailModal.classList.add('hidden'));

        checkIn?.addEventListener('change', manejarCambioFecha);
        checkOut?.addEventListener('change', manejarCambioFecha);
        this.asignarEventosFiltros();


        const inputBusqueda = this.querySelector('#reservaSearch') as HTMLInputElement;
        inputBusqueda?.addEventListener('input', () => {
        const termino = inputBusqueda.value.toLowerCase().trim();

        if (termino === "") {
            this.renderizarTabla(this.reservasActuales);
            return;
        }

        const filtradas = this.reservasActuales
            .map(res => {
                const huespedCoincidente = res.huespedes?.find(h =>
                    (h.documento || "").toLowerCase().includes(termino)
                );

                const titularOriginal = res.huespedes?.[0];

                const nombreCompleto = titularOriginal
                    ? `${titularOriginal.nombre} ${titularOriginal.apellido || ''}`.toLowerCase()
                    : "";

                const coincideNombre = nombreCompleto.includes(termino);

                
                if (!huespedCoincidente && !coincideNombre) {
                    return null;
                }

                if (huespedCoincidente) {
                    return {
                        ...res,
                        huespedes: [huespedCoincidente, ...res.huespedes.filter(h => h !== huespedCoincidente)]
                    };
                }

                return res;
            })
            .filter(res => res !== null) as ReservaResponse[];

        this.renderizarTabla(filtradas);
    });



        
    }

// Método auxiliar para seleccionar la habitación (parecido al de huéspedes)
    private asignarEventosHabitaciones(container: HTMLElement): void {
        const cards = container.querySelectorAll('.room-card');

        cards.forEach(card => {
            card.addEventListener('click', () => {
                // Desmarcar otras
                cards.forEach(c => c.classList.remove('selected'));
                // Marcar esta
                card.classList.add('selected');
                // Guardar ID en el dataset del contenedor para que validarFormulario() lo vea
                container.dataset.selectedId = (card as HTMLElement).dataset.id;
                
                this.validarFormulario();
            });
        });
    }
    private asignarEventosFiltros(): void {
        const filtros = this.querySelectorAll('.reservations__filter-btn');
        
        filtros.forEach(boton => {
            boton.addEventListener('click', async () => {
                // 1. Estética: Cambiar botón activo
                filtros.forEach(b => b.classList.remove('reservations__filter-btn--active'));
                boton.classList.add('reservations__filter-btn--active');

                const estado = (boton as HTMLElement).dataset.filter;

                try {
                    
                    
                    if (estado === 'TODAS') {
                        this.reservasActuales = await getTodasLasReservas();
                    } else {
                        // Llamamos al nuevo método por estado
                        this.reservasActuales = await getReservasPorEstado(estado!);
                    }

                    // 2. Renderizar la tabla con los nuevos datos
                    this.renderizarTabla(this.reservasActuales);
                    
                } catch (error: any) {
                    this.showToast(error.message, 'error');
                }
            });
        });
        
    }
    private renderizarTabla(reservas: ReservaResponse[]): void {
        const tbody = this.querySelector('.reservations__table-body') as HTMLElement;
        if (!tbody) return;

        if (reservas.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" style="text-align:center; padding: 30px;">No se encontraron reservas.</td></tr>';
            return;
        }

        tbody.innerHTML = reservas.map(res => {
            const estadoClase = res.estadoReserva.toLowerCase().replace('_', '-'); 
            const titular = res.huespedes[0];
            const iniciales = `${titular.nombre[0]}${titular.apellido?.[0] || ''}`.toUpperCase();
            const avatarColor = this.getRandomColor();

            return `
                <tr class="reservations__table-row" data-id="${res.id}">
                    <td class="reservations__table-td">
                        <div class="reservations__guest-info">
                            <div class="reservations__avatar" style="background-color: ${avatarColor}; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; border-radius: 50%; width: 35px; height: 35px;">
                                ${iniciales}
                            </div>
                            <span class="reservations__guest-name" style="text-transform: capitalize;">
                                ${titular.nombre.toLowerCase()} ${titular.apellido?.toLowerCase() || ''}
                            </span>
                        </div>
                    </td>
                   
                    <td class="reservations__table-td">${new Date(res.fechaCheckInEsperado).toLocaleDateString()}</td>
                    <td class="reservations__table-td">${new Date(res.fechaCheckOutEsperado).toLocaleDateString()}</td>
                    <td class="reservations__table-td"><strong style="color: #2d3436;">$${res.precioTotal.toFixed(2)}</strong></td>
                    <td class="reservations__table-td">
                        <span class="reservations__badge reservations__badge--${estadoClase}">${res.estadoReserva}</span>
                    </td>
                    <td class="reservations__table-td">
                        <button class="btn-ver-detalle" data-id="${res.id}" style="cursor: pointer; padding: 8px; border-radius: 6px; border: 1px solid #eee; background: white; display: flex; align-items: center; transition: all 0.2s;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#636e72" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                        </button>
                    </td>
                </tr>`;
        }).join('');

        // Asignar eventos de detalle (usando el array 'reservas' que llega por parámetro)
        this.querySelectorAll('.btn-ver-detalle').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = (btn as HTMLElement).dataset.id;
                const reserva = reservas.find(r => r.id === id);
                if (reserva) this.abrirModalDetalle(reserva);
            });
        });
    }


};

customElements.define("app-reservas",Reservas);
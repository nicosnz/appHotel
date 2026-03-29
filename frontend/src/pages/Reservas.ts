export class Reservas extends HTMLElement{
    constructor(){
        super()
    };

    connectedCallback(){
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
                    <div class="reservations__filters">
                        <button class="reservations__filter-btn reservations__filter-btn--active" data-filter="todas">Todas</button>
                        <button class="reservations__filter-btn" data-filter="activa">Activa</button>
                        <button class="reservations__filter-btn" data-filter="pendiente">Pendiente</button>
                        <button class="reservations__filter-btn" data-filter="finalizada">Finalizada</button>
                        <button class="reservations__filter-btn" data-filter="cancelada">Cancelada</button>
                
                        <div class="reservations__search">
                        <svg class="reservations__search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                        <input class="reservations__search-input" type="text" placeholder="Buscar por titular o habitación..." aria-label="Buscar reserva"/>
                        </div>
                    </div>
                
                    <!-- ===== TABLA ===== -->
                    <div class="reservations__table-wrapper">
                        <table class="reservations__table">
                        <thead class="reservations__table-head">
                            <tr>
                            <th class="reservations__table-th">Titular</th>
                            <th class="reservations__table-th">Habitación</th>
                            <th class="reservations__table-th">Entrada</th>
                            <th class="reservations__table-th">Salida esperada</th>
                            <th class="reservations__table-th">Precio total</th>
                            <th class="reservations__table-th">Estado</th>
                            <th class="reservations__table-th reservations__table-th--actions">Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="reservations__table-body">
                
                            <!-- Fila 1 -->
                            <tr class="reservations__table-row" data-id="1">
                            <td class="reservations__table-td">
                                <div class="reservations__guest-info">
                                <div class="reservations__avatar" style="--avatar-color:#335c67;">JM</div>
                                <span class="reservations__guest-name">Juan Martínez</span>
                                </div>
                            </td>
                            <td class="reservations__table-td">Hab. 101</td>
                            <td class="reservations__table-td">12 Jun 2025</td>
                            <td class="reservations__table-td">18 Jun 2025</td>
                            <td class="reservations__table-td reservations__table-td--price">$510.00</td>
                            <td class="reservations__table-td">
                                <span class="reservations__badge reservations__badge--active">Activa</span>
                            </td>
                            <td class="reservations__table-td reservations__table-td--actions">
                                <button class="reservations__action-btn reservations__action-btn--view" aria-label="Ver detalle" data-row="1">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                </button>
                                <button class="reservations__action-btn reservations__action-btn--edit" aria-label="Editar">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                </button>
                                <button class="reservations__action-btn reservations__action-btn--delete" aria-label="Eliminar">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                                </button>
                            </td>
                            </tr>
                
                            <!-- Fila 2 -->
                            <tr class="reservations__table-row" data-id="2">
                            <td class="reservations__table-td">
                                <div class="reservations__guest-info">
                                <div class="reservations__avatar" style="--avatar-color:#e09f3e;">AL</div>
                                <span class="reservations__guest-name">Ana López</span>
                                </div>
                            </td>
                            <td class="reservations__table-td">Hab. 205</td>
                            <td class="reservations__table-td">10 Jun 2025</td>
                            <td class="reservations__table-td">15 Jun 2025</td>
                            <td class="reservations__table-td reservations__table-td--price">$275.00</td>
                            <td class="reservations__table-td">
                                <span class="reservations__badge reservations__badge--finished">Finalizada</span>
                            </td>
                            <td class="reservations__table-td reservations__table-td--actions">
                                <button class="reservations__action-btn reservations__action-btn--view" aria-label="Ver detalle" data-row="2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                </button>
                                <button class="reservations__action-btn reservations__action-btn--edit" aria-label="Editar">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                </button>
                                <button class="reservations__action-btn reservations__action-btn--delete" aria-label="Eliminar">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                                </button>
                            </td>
                            </tr>
                
                            <!-- Fila 3 -->
                            <tr class="reservations__table-row" data-id="3">
                            <td class="reservations__table-td">
                                <div class="reservations__guest-info">
                                <div class="reservations__avatar" style="--avatar-color:#9e2a2b;">CR</div>
                                <span class="reservations__guest-name">Carlos Ruiz</span>
                                </div>
                            </td>
                            <td class="reservations__table-td">Hab. 305</td>
                            <td class="reservations__table-td">14 Jun 2025</td>
                            <td class="reservations__table-td">20 Jun 2025</td>
                            <td class="reservations__table-td reservations__table-td--price">$1,080.00</td>
                            <td class="reservations__table-td">
                                <span class="reservations__badge reservations__badge--pending">Pendiente</span>
                            </td>
                            <td class="reservations__table-td reservations__table-td--actions">
                                <button class="reservations__action-btn reservations__action-btn--view" aria-label="Ver detalle" data-row="3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                </button>
                                <button class="reservations__action-btn reservations__action-btn--edit" aria-label="Editar">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                </button>
                                <button class="reservations__action-btn reservations__action-btn--delete" aria-label="Eliminar">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                                </button>
                            </td>
                            </tr>
                
                            <!-- Fila 4 -->
                            <tr class="reservations__table-row" data-id="4">
                            <td class="reservations__table-td">
                                <div class="reservations__guest-info">
                                <div class="reservations__avatar" style="--avatar-color:#540b0e;">MG</div>
                                <span class="reservations__guest-name">María García</span>
                                </div>
                            </td>
                            <td class="reservations__table-td">Hab. 118</td>
                            <td class="reservations__table-td">08 Jun 2025</td>
                            <td class="reservations__table-td">13 Jun 2025</td>
                            <td class="reservations__table-td reservations__table-td--price">$380.00</td>
                            <td class="reservations__table-td">
                                <span class="reservations__badge reservations__badge--cancelled">Cancelada</span>
                            </td>
                            <td class="reservations__table-td reservations__table-td--actions">
                                <button class="reservations__action-btn reservations__action-btn--view" aria-label="Ver detalle" data-row="4">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                </button>
                                <button class="reservations__action-btn reservations__action-btn--edit" aria-label="Editar">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                </button>
                                <button class="reservations__action-btn reservations__action-btn--delete" aria-label="Eliminar">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                                </button>
                            </td>
                            </tr>
                
                        </tbody>
                        </table>
                    </div>
                
                    <!-- ===== PAGINACIÓN ===== -->
                    <div class="reservations__pagination">
                        <p class="reservations__pagination-info">Mostrando 1–4 de 31 reservas</p>
                        <div class="reservations__pagination-controls">
                        <button class="reservations__page-btn" disabled aria-label="Anterior">&#8592;</button>
                        <button class="reservations__page-btn reservations__page-btn--active">1</button>
                        <button class="reservations__page-btn">2</button>
                        <button class="reservations__page-btn">3</button>
                        <button class="reservations__page-btn" aria-label="Siguiente">&#8594;</button>
                        </div>
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
                        <span class="modal__info-label">Email</span>
                        <span class="modal__info-value" id="modalEmail"></span>
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
                        <span class="modal__info-label">Nombre</span>
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
                        <span class="modal__info-label">Salida real</span>
                        <span class="modal__info-value" id="modalFechaActual"></span>
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
        
        
        
        `;
    }
};

customElements.define("app-reservas",Reservas);
export class Empleados extends HTMLElement {
    constructor(){
        super();
    };

    connectedCallback(){
        this.innerHTML = `
            <main class="container">
 
                <section class="employees">
            
                <!-- ===== CABECERA ===== -->
                <div class="employees__header">
                    <div class="employees__title-group">
                    <h1 class="employees__title">Lista de Empleados</h1>
                    <p class="employees__subtitle">Gestiona el personal activo e inactivo del hotel</p>
                    </div>
                    <button class="employees__add-btn">
                    <span class="employees__add-btn-icon">+</span>
                    <span>Nuevo empleado</span>
                    </button>
                </div>
            
                <!-- ===== FILTROS ===== -->
                <div class="employees__filters">
                    <button class="employees__filter-btn employees__filter-btn--active" data-filter="todos">Todos</button>
                    <button class="employees__filter-btn" data-filter="activo">Activos</button>
                    <button class="employees__filter-btn" data-filter="inactivo">Inactivos</button>
            
                    <div class="employees__search">
                    <svg class="employees__search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    <input class="employees__search-input" type="text" placeholder="Buscar empleado..." aria-label="Buscar empleado"/>
                    </div>
                </div>
            
                <!-- ===== TABLA ===== -->
                <div class="employees__table-wrapper">
                    <table class="employees__table">
                    <thead class="employees__table-head">
                        <tr>
                        <th class="employees__table-th">Empleado</th>
                        <th class="employees__table-th">Cargo</th>
                        <th class="employees__table-th">Turno</th>
                        <th class="employees__table-th">Fecha ingreso</th>
                        <th class="employees__table-th">Estado</th>
                        <th class="employees__table-th employees__table-th--actions">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="employees__table-body">
            
                        <!-- Fila 1 -->
                        <tr class="employees__table-row">
                        <td class="employees__table-td">
                            <div class="employees__emp-info">
                            <div class="employees__avatar" style="--avatar-color:#335c67;">RP</div>
                            <div>
                                <p class="employees__emp-name">Roberto Peralta</p>
                                <p class="employees__emp-email">r.peralta@nicosan.com</p>
                            </div>
                            </div>
                        </td>
                        <td class="employees__table-td">
                            <span class="employees__role-tag employees__role-tag--admin">Administrador</span>
                        </td>
                        <td class="employees__table-td">Mañana</td>
                        <td class="employees__table-td">03 Ene 2020</td>
                        <td class="employees__table-td">
                            <span class="employees__badge employees__badge--active">Activo</span>
                        </td>
                        <td class="employees__table-td employees__table-td--actions">
                            <button class="employees__action-btn employees__action-btn--view" aria-label="Ver detalle" data-row="1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                            </button>
                            <button class="employees__action-btn employees__action-btn--edit" aria-label="Editar">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            </button>
                            <button class="employees__action-btn employees__action-btn--delete" aria-label="Eliminar">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                            </button>
                        </td>
                        </tr>
            
                        <!-- Fila 2 -->
                        <tr class="employees__table-row">
                        <td class="employees__table-td">
                            <div class="employees__emp-info">
                            <div class="employees__avatar" style="--avatar-color:#e09f3e;">CV</div>
                            <div>
                                <p class="employees__emp-name">Camila Vega</p>
                                <p class="employees__emp-email">c.vega@nicosan.com</p>
                            </div>
                            </div>
                        </td>
                        <td class="employees__table-td">
                            <span class="employees__role-tag employees__role-tag--reception">Recepcionista</span>
                        </td>
                        <td class="employees__table-td">Tarde</td>
                        <td class="employees__table-td">15 Mar 2022</td>
                        <td class="employees__table-td">
                            <span class="employees__badge employees__badge--active">Activo</span>
                        </td>
                        <td class="employees__table-td employees__table-td--actions">
                            <button class="employees__action-btn employees__action-btn--view" aria-label="Ver detalle" data-row="2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                            </button>
                            <button class="employees__action-btn employees__action-btn--edit" aria-label="Editar">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            </button>
                            <button class="employees__action-btn employees__action-btn--delete" aria-label="Eliminar">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                            </button>
                        </td>
                        </tr>
            
                        <!-- Fila 3 -->
                        <tr class="employees__table-row">
                        <td class="employees__table-td">
                            <div class="employees__emp-info">
                            <div class="employees__avatar" style="--avatar-color:#9e2a2b;">DM</div>
                            <div>
                                <p class="employees__emp-name">Diego Molina</p>
                                <p class="employees__emp-email">d.molina@nicosan.com</p>
                            </div>
                            </div>
                        </td>
                        <td class="employees__table-td">
                            <span class="employees__role-tag employees__role-tag--cleaning">Limpieza</span>
                        </td>
                        <td class="employees__table-td">Noche</td>
                        <td class="employees__table-td">21 Jul 2021</td>
                        <td class="employees__table-td">
                            <span class="employees__badge employees__badge--inactive">Inactivo</span>
                        </td>
                        <td class="employees__table-td employees__table-td--actions">
                            <button class="employees__action-btn employees__action-btn--view" aria-label="Ver detalle" data-row="3">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                            </button>
                            <button class="employees__action-btn employees__action-btn--edit" aria-label="Editar">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            </button>
                            <button class="employees__action-btn employees__action-btn--delete" aria-label="Eliminar">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                            </button>
                        </td>
                        </tr>
            
                        <!-- Fila 4 -->
                        <tr class="employees__table-row">
                        <td class="employees__table-td">
                            <div class="employees__emp-info">
                            <div class="employees__avatar" style="--avatar-color:#540b0e;">LF</div>
                            <div>
                                <p class="employees__emp-name">Lucía Fernández</p>
                                <p class="employees__emp-email">l.fernandez@nicosan.com</p>
                            </div>
                            </div>
                        </td>
                        <td class="employees__table-td">
                            <span class="employees__role-tag employees__role-tag--maintenance">Mantenimiento</span>
                        </td>
                        <td class="employees__table-td">Mañana</td>
                        <td class="employees__table-td">08 Nov 2023</td>
                        <td class="employees__table-td">
                            <span class="employees__badge employees__badge--active">Activo</span>
                        </td>
                        <td class="employees__table-td employees__table-td--actions">
                            <button class="employees__action-btn employees__action-btn--view" aria-label="Ver detalle" data-row="4">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                            </button>
                            <button class="employees__action-btn employees__action-btn--edit" aria-label="Editar">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            </button>
                            <button class="employees__action-btn employees__action-btn--delete" aria-label="Eliminar">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                            </button>
                        </td>
                        </tr>
            
                    </tbody>
                    </table>
                </div>
            
                <!-- ===== PAGINACIÓN ===== -->
                <div class="employees__pagination">
                    <p class="employees__pagination-info">Mostrando 1–4 de 12 empleados</p>
                    <div class="employees__pagination-controls">
                    <button class="employees__page-btn" disabled aria-label="Anterior">&#8592;</button>
                    <button class="employees__page-btn employees__page-btn--active">1</button>
                    <button class="employees__page-btn">2</button>
                    <button class="employees__page-btn">3</button>
                    <button class="employees__page-btn" aria-label="Siguiente">&#8594;</button>
                    </div>
                </div>
            
                </section>
            </main>
            
            <!-- ===== MODAL DE DETALLE ===== -->
            <div class="modal-overlay hidden" id="detailModal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
                <div class="modal">
            
                <div class="modal__header">
                    <div>
                    <p class="modal__label">Detalle de empleado</p>
                    <h2 class="modal__title" id="modalTitle"></h2>
                    </div>
                    <button class="modal__close" id="closeModal" aria-label="Cerrar">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                </div>
            
                <!-- Avatar + estado -->
                <div class="modal__hero">
                    <div class="modal__hero-avatar" id="modalAvatar"></div>
                    <div class="modal__hero-info">
                    <p class="modal__hero-name" id="modalHeroName"></p>
                    <p class="modal__hero-email" id="modalHeroEmail"></p>
                    <span class="modal__status-badge" id="modalStatus"></span>
                    </div>
                </div>
            
                <div class="modal__body">
            
                    <!-- Datos personales -->
                    <div class="modal__section">
                    <h3 class="modal__section-title">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        Datos personales
                    </h3>
                    <div class="modal__info-grid">
                        <div class="modal__info-item">
                        <span class="modal__info-label">Nombre completo</span>
                        <span class="modal__info-value" id="modalNombre"></span>
                        </div>
                        <div class="modal__info-item">
                        <span class="modal__info-label">DNI / CI</span>
                        <span class="modal__info-value" id="modalDni"></span>
                        </div>
                        <div class="modal__info-item">
                        <span class="modal__info-label">Teléfono</span>
                        <span class="modal__info-value" id="modalTelefono"></span>
                        </div>
                        <div class="modal__info-item">
                        <span class="modal__info-label">Email</span>
                        <span class="modal__info-value" id="modalEmail"></span>
                        </div>
                    </div>
                    </div>
            
                    <!-- Datos laborales -->
                    <div class="modal__section">
                    <h3 class="modal__section-title">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                        Datos laborales
                    </h3>
                    <div class="modal__info-grid">
                        <div class="modal__info-item">
                        <span class="modal__info-label">Cargo</span>
                        <span class="modal__info-value" id="modalCargo"></span>
                        </div>
                        <div class="modal__info-item">
                        <span class="modal__info-label">Turno</span>
                        <span class="modal__info-value" id="modalTurno"></span>
                        </div>
                        <div class="modal__info-item">
                        <span class="modal__info-label">Fecha de ingreso</span>
                        <span class="modal__info-value" id="modalIngreso"></span>
                        </div>
                        <div class="modal__info-item">
                        <span class="modal__info-label">Antigüedad</span>
                        <span class="modal__info-value" id="modalAntiguedad"></span>
                        </div>
                    </div>
                    </div>
            
                    <!-- Salario -->
                    <div class="modal__section">
                    <h3 class="modal__section-title">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                        Salario
                    </h3>
                    <div class="modal__finance-grid">
                        <div class="modal__finance-card">
                        <span class="modal__finance-label">Salario mensual</span>
                        <span class="modal__finance-value modal__finance-value--salary" id="modalSalario"></span>
                        </div>
                        <div class="modal__finance-card">
                        <span class="modal__finance-label">Horas por semana</span>
                        <span class="modal__finance-value modal__finance-value--hours" id="modalHoras"></span>
                        </div>
                    </div>
                    </div>
            
                </div>
            
                <div class="modal__footer">
                    <button class="modal__btn modal__btn--secondary" id="closeModalFooter">Cerrar</button>
                    <button class="modal__btn modal__btn--primary">Editar empleado</button>
                </div>
            
                </div>
            </div>
        
        `;
    };
};
customElements.define("app-empleados",Empleados);
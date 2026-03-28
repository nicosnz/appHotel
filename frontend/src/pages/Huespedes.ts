export class Huespedes extends HTMLElement{
    constructor(){
        super();
    };

    connectedCallback(){
        this.innerHTML = `
          <main class="container">
 
                <!-- ===== CABECERA DE SECCIÓN ===== -->
                <section class="guests">
            
                <div class="guests__header">
                    <div class="guests__title-group">
                    <h1 class="guests__title">Lista de huéspedes</h1>
                    <p class="guests__subtitle">Gestiona el registro de todos los huéspedes del hotel</p>
                    </div>
            
                    <button class="guests__add-btn" aria-label="Agregar huésped">
                    <span class="guests__add-btn-icon">+</span>
                    <span>Nuevo huésped</span>
                    </button>
                </div>
            
                <!-- ===== FILTROS ===== -->
                <div class="guests__filters">
                    <button class="guests__filter-btn guests__filter-btn--active" data-filter="todos">
                    Todos los huéspedes
                    </button>
                    <button class="guests__filter-btn" data-filter="activos">
                    Activos
                    </button>
                    <button class="guests__filter-btn" data-filter="inactivos">
                    Inactivos
                    </button>
            
                    <div class="guests__search">
                    <svg class="guests__search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    <input
                        class="guests__search-input"
                        type="text"
                        placeholder="Buscar huésped..."
                        aria-label="Buscar huésped"
                    />
                    </div>
                </div>
            
                <!-- ===== TABLA ===== -->
                <div class="guests__table-wrapper">
                    <table class="guests__table">
                    <thead class="guests__table-head">
                        <tr>
                        <th class="guests__table-th">Huésped</th>
                        <th class="guests__table-th">Habitación</th>
                        <th class="guests__table-th">Fecha Entrada</th>
                        <th class="guests__table-th">Fecha Salida</th>
                        <th class="guests__table-th">Estado</th>
                        <th class="guests__table-th guests__table-th--actions">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="guests__table-body">
            
                        <!-- Fila 1 -->
                        <tr class="guests__table-row">
                        <td class="guests__table-td">
                            <div class="guests__guest-info">
                            <div class="guests__avatar" style="--avatar-color: #335c67;">JM</div>
                            <div>
                                <p class="guests__guest-name">Juan Martínez</p>
                                <p class="guests__guest-email">juan@email.com</p>
                            </div>
                            </div>
                        </td>
                        <td class="guests__table-td">101</td>
                        <td class="guests__table-td">12 Jun 2025</td>
                        <td class="guests__table-td">18 Jun 2025</td>
                        <td class="guests__table-td">
                            <span class="guests__badge guests__badge--active">Activo</span>
                        </td>
                        <td class="guests__table-td guests__table-td--actions">
                            <button class="guests__action-btn guests__action-btn--edit" aria-label="Editar">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            </button>
                            <button class="guests__action-btn guests__action-btn--delete" aria-label="Eliminar">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                            </button>
                        </td>
                        </tr>
            
                        <!-- Fila 2 -->
                        <tr class="guests__table-row">
                        <td class="guests__table-td">
                            <div class="guests__guest-info">
                            <div class="guests__avatar" style="--avatar-color: #e09f3e;">AL</div>
                            <div>
                                <p class="guests__guest-name">Ana López</p>
                                <p class="guests__guest-email">ana@email.com</p>
                            </div>
                            </div>
                        </td>
                        <td class="guests__table-td">205</td>
                        <td class="guests__table-td">10 Jun 2025</td>
                        <td class="guests__table-td">15 Jun 2025</td>
                        <td class="guests__table-td">
                            <span class="guests__badge guests__badge--inactive">Inactivo</span>
                        </td>
                        <td class="guests__table-td guests__table-td--actions">
                            <button class="guests__action-btn guests__action-btn--edit" aria-label="Editar">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            </button>
                            <button class="guests__action-btn guests__action-btn--delete" aria-label="Eliminar">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                            </button>
                        </td>
                        </tr>
            
                        <!-- Fila 3 -->
                        <tr class="guests__table-row">
                        <td class="guests__table-td">
                            <div class="guests__guest-info">
                            <div class="guests__avatar" style="--avatar-color: #9e2a2b;">CR</div>
                            <div>
                                <p class="guests__guest-name">Carlos Ruiz</p>
                                <p class="guests__guest-email">carlos@email.com</p>
                            </div>
                            </div>
                        </td>
                        <td class="guests__table-td">312</td>
                        <td class="guests__table-td">14 Jun 2025</td>
                        <td class="guests__table-td">20 Jun 2025</td>
                        <td class="guests__table-td">
                            <span class="guests__badge guests__badge--active">Activo</span>
                        </td>
                        <td class="guests__table-td guests__table-td--actions">
                            <button class="guests__action-btn guests__action-btn--edit" aria-label="Editar">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            </button>
                            <button class="guests__action-btn guests__action-btn--delete" aria-label="Eliminar">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                            </button>
                        </td>
                        </tr>
            
                        <!-- Fila 4 -->
                        <tr class="guests__table-row">
                        <td class="guests__table-td">
                            <div class="guests__guest-info">
                            <div class="guests__avatar" style="--avatar-color: #540b0e;">MG</div>
                            <div>
                                <p class="guests__guest-name">María García</p>
                                <p class="guests__guest-email">maria@email.com</p>
                            </div>
                            </div>
                        </td>
                        <td class="guests__table-td">118</td>
                        <td class="guests__table-td">08 Jun 2025</td>
                        <td class="guests__table-td">13 Jun 2025</td>
                        <td class="guests__table-td">
                            <span class="guests__badge guests__badge--inactive">Inactivo</span>
                        </td>
                        <td class="guests__table-td guests__table-td--actions">
                            <button class="guests__action-btn guests__action-btn--edit" aria-label="Editar">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            </button>
                            <button class="guests__action-btn guests__action-btn--delete" aria-label="Eliminar">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                            </button>
                        </td>
                        </tr>
            
                    </tbody>
                    </table>
                </div>
            
                <!-- ===== PAGINACIÓN ===== -->
                <div class="guests__pagination">
                    <p class="guests__pagination-info">Mostrando 1–4 de 24 huéspedes</p>
                    <div class="guests__pagination-controls">
                    <button class="guests__page-btn" disabled aria-label="Anterior">&#8592;</button>
                    <button class="guests__page-btn guests__page-btn--active">1</button>
                    <button class="guests__page-btn">2</button>
                    <button class="guests__page-btn">3</button>
                    <button class="guests__page-btn" aria-label="Siguiente">&#8594;</button>
                    </div>
                </div>
            
                </section>
            </main>
        
        
        `;
    }
};
customElements.define("app-huespedes",Huespedes);
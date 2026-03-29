export class Habitaciones extends HTMLElement{
    constructor(){
        super();
    };

    connectedCallback(){
        this.innerHTML = `
            <main class="container">
 
                    <section class="rooms">
                
                    <!-- ===== CABECERA ===== -->
                    <div class="rooms__header">
                        <div class="rooms__title-group">
                        <h1 class="rooms__title">Lista de Habitaciones</h1>
                        <p class="rooms__subtitle">Administra el estado y disponibilidad de cada habitación</p>
                        </div>
                
                    
                    </div>
                
                    <!-- ===== FILTROS ===== -->
                    <div class="rooms__filters">
                        <button class="rooms__filter-btn rooms__filter-btn--active" data-filter="todas">
                        Todas las habitaciones
                        </button>
                        <button class="rooms__filter-btn" data-filter="libres">
                        Habitaciones libres
                        </button>
                        <button class="rooms__filter-btn" data-filter="ocupadas">
                        Habitaciones ocupadas
                        </button>
                
                        <div class="rooms__search">
                        <svg class="rooms__search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                        <input
                            class="rooms__search-input"
                            type="text"
                            placeholder="Buscar habitación..."
                            aria-label="Buscar habitación"
                        />
                        </div>
                    </div>
                
                    <!-- ===== TABLA ===== -->
                    <div class="rooms__table-wrapper">
                        <table class="rooms__table">
                        <thead class="rooms__table-head">
                            <tr>
                            <th class="rooms__table-th">Nombre</th>
                            <th class="rooms__table-th">Nro. Camas</th>
                            <th class="rooms__table-th">Tipo de habitación</th>
                            <th class="rooms__table-th">Piso</th>
                            <th class="rooms__table-th">Precio por noche</th>
                            <th class="rooms__table-th">Estado</th>
                            <th class="rooms__table-th rooms__table-th--actions">Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="rooms__table-body">
                
                            <!-- Fila 1 -->
                            <tr class="rooms__table-row">
                            <td class="rooms__table-td">
                                <div class="rooms__room-info">
                                <div class="rooms__room-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                                </div>
                                <span class="rooms__room-name">Hab. 101</span>
                                </div>
                            </td>
                            <td class="rooms__table-td">2</td>
                            <td class="rooms__table-td">
                                <span class="rooms__type-tag rooms__type-tag--doble">Doble</span>
                            </td>
                            <td class="rooms__table-td">1</td>
                            <td class="rooms__table-td rooms__table-td--price">$85.00</td>
                            <td class="rooms__table-td">
                                <span class="rooms__badge rooms__badge--free">Libre</span>
                            </td>
                            <td class="rooms__table-td rooms__table-td--actions">
                                <button class="rooms__action-btn rooms__action-btn--view" aria-label="Ver detalle">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                </button>
                                <button class="rooms__action-btn rooms__action-btn--edit" aria-label="Editar">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                </button>
                                <button class="rooms__action-btn rooms__action-btn--delete" aria-label="Eliminar">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                                </button>
                            </td>
                            </tr>
                
                            <!-- Fila 2 -->
                            <tr class="rooms__table-row">
                            <td class="rooms__table-td">
                                <div class="rooms__room-info">
                                <div class="rooms__room-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                                </div>
                                <span class="rooms__room-name">Hab. 202</span>
                                </div>
                            </td>
                            <td class="rooms__table-td">1</td>
                            <td class="rooms__table-td">
                                <span class="rooms__type-tag rooms__type-tag--simple">Simple</span>
                            </td>
                            <td class="rooms__table-td">2</td>
                            <td class="rooms__table-td rooms__table-td--price">$55.00</td>
                            <td class="rooms__table-td">
                                <span class="rooms__badge rooms__badge--occupied">Ocupada</span>
                            </td>
                            <td class="rooms__table-td rooms__table-td--actions">
                                <button class="rooms__action-btn rooms__action-btn--view" aria-label="Ver detalle">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                </button>
                                <button class="rooms__action-btn rooms__action-btn--edit" aria-label="Editar">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                </button>
                                <button class="rooms__action-btn rooms__action-btn--delete" aria-label="Eliminar">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                                </button>
                            </td>
                            </tr>
                
                            <!-- Fila 3 -->
                            <tr class="rooms__table-row">
                            <td class="rooms__table-td">
                                <div class="rooms__room-info">
                                <div class="rooms__room-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                                </div>
                                <span class="rooms__room-name">Hab. 305</span>
                                </div>
                            </td>
                            <td class="rooms__table-td">3</td>
                            <td class="rooms__table-td">
                                <span class="rooms__type-tag rooms__type-tag--suite">Suite</span>
                            </td>
                            <td class="rooms__table-td">3</td>
                            <td class="rooms__table-td rooms__table-td--price">$180.00</td>
                            <td class="rooms__table-td">
                                <span class="rooms__badge rooms__badge--free">Libre</span>
                            </td>
                            <td class="rooms__table-td rooms__table-td--actions">
                                <button class="rooms__action-btn rooms__action-btn--view" aria-label="Ver detalle">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                </button>
                                <button class="rooms__action-btn rooms__action-btn--edit" aria-label="Editar">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                </button>
                                <button class="rooms__action-btn rooms__action-btn--delete" aria-label="Eliminar">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                                </button>
                            </td>
                            </tr>
                
                            <!-- Fila 4 -->
                            <tr class="rooms__table-row">
                            <td class="rooms__table-td">
                                <div class="rooms__room-info">
                                <div class="rooms__room-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                                </div>
                                <span class="rooms__room-name">Hab. 410</span>
                                </div>
                            </td>
                            <td class="rooms__table-td">2</td>
                            <td class="rooms__table-td">
                                <span class="rooms__type-tag rooms__type-tag--doble">Doble</span>
                            </td>
                            <td class="rooms__table-td">4</td>
                            <td class="rooms__table-td rooms__table-td--price">$95.00</td>
                            <td class="rooms__table-td">
                                <span class="rooms__badge rooms__badge--occupied">Ocupada</span>
                            </td>
                            <td class="rooms__table-td rooms__table-td--actions">
                                <button class="rooms__action-btn rooms__action-btn--view" aria-label="Ver detalle">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                </button>
                                <button class="rooms__action-btn rooms__action-btn--edit" aria-label="Editar">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                </button>
                                <button class="rooms__action-btn rooms__action-btn--delete" aria-label="Eliminar">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                                </button>
                            </td>
                            </tr>
                
                        </tbody>
                        </table>
                    </div>
                
                    <!-- ===== PAGINACIÓN ===== -->
                    <div class="rooms__pagination">
                        <p class="rooms__pagination-info">Mostrando 1–4 de 18 habitaciones</p>
                        <div class="rooms__pagination-controls">
                        <button class="rooms__page-btn" disabled aria-label="Anterior">&#8592;</button>
                        <button class="rooms__page-btn rooms__page-btn--active">1</button>
                        <button class="rooms__page-btn">2</button>
                        <button class="rooms__page-btn">3</button>
                        <button class="rooms__page-btn" aria-label="Siguiente">&#8594;</button>
                        </div>
                    </div>
                
                    </section>
            </main>
        
        
        
        `;
    }

};
customElements.define("app-habitaciones",Habitaciones);
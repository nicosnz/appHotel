export class Home extends HTMLElement{
    constructor(){
        super();
    };


    connectedCallback(){
        this.innerHTML = `
                <main class="container">
                    <section class="home">
                
                    <!-- ===== CABECERA ===== -->
                    <div class="home__header">
                        <div class="home__title-group">
                        <p class="home__greeting">Bienvenido de vuelta 👋</p>
                        <h1 class="home__title">Hotel Nicosan</h1>
                        </div>
                        <div class="home__date" id="homeDate"></div>
                    </div>
                
                    <!-- ===== STAT CARDS ===== -->
                    <div class="home__stats">
                
                        <div class="home__stat-card home__stat-card--guests">
                        <div class="home__stat-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                            </svg>
                        </div>
                        <div class="home__stat-info">
                            <p class="home__stat-label">Huéspedes en el hotel</p>
                            <p class="home__stat-value">24</p>
                            <p class="home__stat-delta home__stat-delta--up">+3 desde ayer</p>
                        </div>
                        </div>
                
                        <div class="home__stat-card home__stat-card--rooms">
                        <div class="home__stat-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                            <polyline points="9 22 9 12 15 12 15 22"/>
                            </svg>
                        </div>
                        <div class="home__stat-info">
                            <p class="home__stat-label">Habitaciones ocupadas</p>
                            <p class="home__stat-value">14 <span class="home__stat-total">/ 18</span></p>
                            <p class="home__stat-delta home__stat-delta--neutral">78% de ocupación</p>
                        </div>
                        </div>
                
                        <div class="home__stat-card home__stat-card--reservations">
                        <div class="home__stat-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                        </div>
                        <div class="home__stat-info">
                            <p class="home__stat-label">Reservas activas</p>
                            <p class="home__stat-value">31</p>
                            <p class="home__stat-delta home__stat-delta--up">+5 esta semana</p>
                        </div>
                        </div>
                
                        <div class="home__stat-card home__stat-card--employees">
                        <div class="home__stat-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                        </div>
                        <div class="home__stat-info">
                            <p class="home__stat-label">Empleados activos</p>
                            <p class="home__stat-value">12</p>
                            <p class="home__stat-delta home__stat-delta--neutral">Sin cambios</p>
                        </div>
                        </div>
                
                    </div>
                
                    
                </main>
        `
    }
};
customElements.define("app-home",Home);
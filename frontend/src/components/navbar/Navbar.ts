export class Navbar extends HTMLElement{
    constructor(){
        super();
        
        
    };

    connectedCallback(){
        this.innerHTML = `
       <nav class="sidebar">
            <div class="sidebar__logo">
                <h2>Hotel Nicosan</h2>
            </div>

            <div class="sidebar__menu">
                <a href="/" class="sidebar__item">Inicio</a>
                <a href="/huespedes" class="sidebar__item">Huéspedes</a>
                <a href="/habitaciones" class="sidebar__item">Habitaciones</a>
                <a href="/reservas" class="sidebar__item">Reservas</a>
                <a href="/empleados" class="sidebar__item">Empleados</a>
            </div>
        </nav>
        `
    }
}

customElements.define("app-navbar",Navbar);
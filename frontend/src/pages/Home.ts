export class Home extends HTMLElement {
    private timerInterval: number | null = null;

    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.iniciarReloj();
    }

    // Limpiamos el intervalo cuando el usuario navega a otra sección
    disconnectedCallback() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
    }

    private iniciarReloj() {
        const timeElement = this.querySelector('#bigTime');
        const dateElement = this.querySelector('#bigDate');
        const greetingElement = this.querySelector('#bigGreeting');

        const actualizar = () => {
            const ahora = new Date();
            
            // Hora formateada (HH:MM:SS)
            if (timeElement) {
                timeElement.textContent = ahora.toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                });
            }

            // Fecha formateada (Largo)
            if (dateElement) {
                dateElement.textContent = ahora.toLocaleDateString('es-ES', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });
            }

            // Saludo dinámico según la hora
            if (greetingElement) {
                const hora = ahora.getHours();
                if (hora < 12) greetingElement.textContent = '¡Buen día! 👋';
                else if (hora < 19) greetingElement.textContent = '¡Buenas tardes! ☀️';
                else greetingElement.textContent = '¡Buenas noches! 🌙';
            }
        };

        actualizar();
        this.timerInterval = window.setInterval(actualizar, 1000);
    }

    private render() {
        this.innerHTML = `
            <div style="
                height: 80vh; 
                display: flex; 
                flex-direction: column; 
                justify-content: center; 
                align-items: center; 
                text-align: center;
                font-family: 'Inter', system-ui, sans-serif;
                color: #1e293b;
            ">
                <p id="bigGreeting" style="
                    font-size: 1.5rem; 
                    font-weight: 500; 
                    color: #64748b; 
                    margin-bottom: 0;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                "></p>
                
                <h1 id="bigTime" style="
                    font-size: clamp(5rem, 15vw, 12rem); 
                    font-weight: 900; 
                    margin: -10px 0;
                    font-variant-numeric: tabular-nums;
                    letter-spacing: -5px;
                    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                ">00:00:00</h1>
                
                <p id="bigDate" style="
                    font-size: clamp(1rem, 4vw, 2rem); 
                    font-weight: 500; 
                    color: #94a3b8;
                    text-transform: capitalize;
                "></p>

                <div style="
                    margin-top: 3rem; 
                    padding: 10px 20px; 
                    background: #f1f5f9; 
                    border-radius: 50px; 
                    color: #64748b; 
                    font-size: 0.9rem;
                    font-weight: 600;
                ">
                    SISTEMA DE GESTIÓN HOTEL NICOSAN v3.0
                </div>
            </div>
        `;
    }
}

customElements.define("app-home", Home);
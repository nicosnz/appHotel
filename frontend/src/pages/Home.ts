export class Home extends HTMLElement{
    constructor(){
        super();
    };


    connectedCallback(){
        this.innerHTML = `
            <section class="home">
                <h1 class="home__title">Bienvenido al Hotel Nicosan</h1>

                <div class="home__cards">

                    <div class="home__card">
                    <h3 class="home__card-title">Huéspedes en el hotel</h3>
                    <div class="home__card-content"></div>
                    </div>

                    <div class="home__card">
                    <h3 class="home__card-title">Nro de Habitaciones ocupadas</h3>
                    <div class="home__card-content"></div>
                    </div>

                </div>
            </section>
        `
    }
};
customElements.define("app-home",Home);
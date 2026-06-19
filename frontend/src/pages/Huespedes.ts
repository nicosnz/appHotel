import type { HuespedForm } from './../components/huespedes/HuespedRequets';
import { createHuesped, getHuespedes } from "../services/Huespedes/HuespedesRepository";
import type { HuespedResponse } from '../services/Huespedes/HuespedResponse';

const AVATAR_COLORS = ['#335c67', '#e09f3e', '#9e2a2b', '#540b0e', '#10b981', '#6366f1', '#4338ca', '#db2777'];

export class Huespedes extends HTMLElement {
  private guests: HuespedResponse[] = [];

  constructor() {
    super();
  }

  async connectedCallback() {
    this.render();
    this.initEvents();
    await this.loadGuests();
  }

  private async loadGuests(): Promise<void> {
    const tbody = this.querySelector('#guestsTableBody');
    if (!tbody) return;

    try {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 2rem;">Cargando huéspedes...</td></tr>`;
      this.guests = await getHuespedes();
      this.renderTable(this.guests);
    } catch (error) {
      console.error(error);
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color: red; padding: 2rem;">Error al conectar con el servidor.</td></tr>`;
    }
  }

  private renderTable(data: HuespedResponse[]): void {
    const tbody = this.querySelector('#guestsTableBody');
    const info = this.querySelector('#guestsPaginationInfo');
    if (!tbody) return;

    if (data.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 2rem;">No se encontraron resultados.</td></tr>`;
      if (info) info.textContent = "Mostrando 0 huéspedes";
      return;
    }

    tbody.innerHTML = data.map(h => this.createRowHTML(h)).join('');
    if (info) info.textContent = `Mostrando ${data.length} de ${this.guests.length} huéspedes`;
  }

  private createRowHTML(h: HuespedResponse): string {
    const initials = `${h.nombre[0]}${h.apellido[0]}`.toUpperCase();
    const randomColor = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
    
    const ultimaReserva = h.reservas && h.reservas.length > 0 ? h.reservas[0] : null;
    const checkIn = ultimaReserva ? new Date(ultimaReserva.fechaCheckInEsperado).toLocaleDateString() : '—';
    const checkOut = ultimaReserva ? new Date(ultimaReserva.fechaCheckOutEsperado).toLocaleDateString() : '—';
    
    const statusClass = h.activo ? 'guests__badge--active' : 'guests__badge--inactive';

    return `
      <tr class="guests__table-row" data-id="${h.id}">
        <td class="guests__table-td">
          <div class="guests__guest-info">
            <div class="guests__avatar" style="--avatar-color:${randomColor};">${initials}</div>
            <div>
              <p class="guests__guest-name">${h.nombre} ${h.apellido}</p>
              <p class="guests__guest-email">${h.genero}</p>
            </div>
          </div>
        </td>
        <td class="guests__table-td">
            <span style="font-weight: 600; color: #1e293b;">${h.documento}</span>
        </td>
        <td class="guests__table-td">${checkIn}</td>
        <td class="guests__table-td">${checkOut}</td>
        <td class="guests__table-td"><span class="guests__badge ${statusClass}">${h.activo ? 'Activo' : 'Inactivo'}</span></td>
        
      </tr>
    `;
  }

  private initEvents(): void {
    this.querySelector('#openGuestModal')?.addEventListener('click', () => this.openModal());
    this.querySelector('#closeGuestModal')?.addEventListener('click', () => this.closeModal());
    this.querySelector('#cancelGuestModal')?.addEventListener('click', () => this.closeModal());
    this.querySelector('#saveGuestBtn')?.addEventListener('click', () => this.handleSave());

    ['nombre', 'apellido', 'documento', 'genero'].forEach(field => {
      const input = this.querySelector(`#guest${field.charAt(0).toUpperCase() + field.slice(1)}`);
      input?.addEventListener('input', () => this.clearFieldError(field));
    });

    

    
  }

  private async handleSave(): Promise<void> {
    if (!this.validate()) return;
    const saveBtn = this.querySelector('#saveGuestBtn') as HTMLButtonElement;

    const data: HuespedForm = {
      nombre: (this.querySelector('#guestNombre') as HTMLInputElement).value.trim(),
      apellido: (this.querySelector('#guestApellido') as HTMLInputElement).value.trim(),
      documento: (this.querySelector('#guestDocumento') as HTMLInputElement).value.trim(),
      genero: (this.querySelector('#guestGenero') as HTMLSelectElement).value,
    };

    try {
      saveBtn.disabled = true;
      const newId = await createHuesped(data);

      const nuevoHuesped: HuespedResponse = {
        id: newId,
        nombre: data.nombre,
        apellido: data.apellido,
        documento: data.documento,
        genero: data.genero,
        activo: true,
        reservas: [] 
      };
      this.guests.unshift(nuevoHuesped as any);
      this.renderTable(this.guests);
      
      this.querySelector('#successToast')?.classList.remove('hidden');
      setTimeout(() => this.closeModal(), 1500);
    } catch (error:any) {
      this.showError(error.message)
    } finally {
      saveBtn.disabled = false;
    }
  }
  private showError(message: string): void {
    let errorBox = this.querySelector('#errorToast') as HTMLElement;

    if (!errorBox) return;

    errorBox.textContent = message;
    errorBox.classList.remove('hidden');

    setTimeout(() => {
      errorBox.classList.add('hidden');
    }, 3000);
  }

  private validate(): boolean {
    const fields = ['nombre', 'apellido', 'documento', 'genero'];
    let valid = true;
    fields.forEach(f => {
      const input = this.querySelector(`#guest${f.charAt(0).toUpperCase() + f.slice(1)}`) as HTMLInputElement;
      if (!input.value.trim()) {
        this.showFieldError(f);
        valid = false;
      } else {
        this.clearFieldError(f);
      }
    });
    return valid;
  }

  private showFieldError(field: string): void {
    this.querySelector(`#field-${field}`)?.classList.add('guest-modal__field--error');
    this.querySelector(`#error-${field}`)?.classList.remove('hidden');
  }

  private clearFieldError(field: string): void {
    this.querySelector(`#field-${field}`)?.classList.remove('guest-modal__field--error');
    this.querySelector(`#error-${field}`)?.classList.add('hidden');
  }

  private openModal(): void {
    this.querySelector('#guestModalOverlay')?.classList.remove('hidden');
    (this.querySelector('#guestNombre') as HTMLElement).focus();
  }

  private closeModal(): void {
    this.querySelector('#guestModalOverlay')?.classList.add('hidden');
    (this.querySelector('#guestForm') as HTMLFormElement).reset();
    this.querySelector('#successToast')?.classList.add('hidden');
  }

  private render() {
    this.innerHTML = `
      <main class="container">
        <section class="guests">
          <div class="guests__header">
            <div class="guests__title-group">
              <h1 class="guests__title">Lista de huéspedes</h1>
              <p class="guests__subtitle">Gestiona el registro de todos los huéspedes del hotel</p>
            </div>
            <button class="guests__add-btn" id="openGuestModal">
              <span class="guests__add-btn-icon">+</span>
              <span>Nuevo huésped</span>
            </button>
          </div>

          <div class="guests__filters">
            <button class="guests__filter-btn guests__filter-btn--active" data-filter="todos">Todos</button>
           
          </div>

          <div class="guests__table-wrapper">
            <table class="guests__table">
              <thead class="guests__table-head">
                <tr>
                  <th class="guests__table-th">Huésped</th>
                  <th class="guests__table-th">Documento</th>
                  <th class="guests__table-th">Fecha Entrada</th>
                  <th class="guests__table-th">Fecha Salida</th>
                  <th class="guests__table-th">Estado</th>
                </tr>
              </thead>
              <tbody class="guests__table-body" id="guestsTableBody"></tbody>
            </table>
          </div>
          <div class="guests__pagination">
            <p class="guests__pagination-info" id="guestsPaginationInfo"></p>
          </div>
        </section>
      </main>

      <div class="guest-modal-overlay hidden" id="guestModalOverlay" role="dialog" aria-modal="true" aria-labelledby="guestModalTitle"> 
         <div class="guest-modal"> 
           <div class="guest-modal__header"> 
             <div> 
               <p class="guest-modal__label">Registro de huésped</p> 
               <h2 class="guest-modal__title" id="guestModalTitle">Nuevo huésped</h2> 
             </div> 
             <button class="guest-modal__close" id="closeGuestModal"> 
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"> 
                 <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/> 
               </svg> 
             </button> 
           </div> 

           <div class="guest-modal__toast guest-modal__toast--success hidden" id="successToast"> 
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"> 
               <polyline points="20 6 9 17 4 12"/> 
             </svg> 
             <span>Huésped registrado correctamente.</span> 
           </div>
           <div class="guest-modal__toast guest-modal__toast--error hidden" id="errorToast">
              <span>Error</span>
          </div>

           <form class="guest-modal__form" id="guestForm" novalidate> 
             <div class="guest-modal__row"> 
               <div class="guest-modal__field" id="field-nombre"> 
                 <label class="guest-modal__label-field" for="guestNombre">Nombre *</label> 
                 <input class="guest-modal__input" type="text" id="guestNombre" name="nombre" placeholder="Nombre"> 
                 <p class="guest-modal__error hidden" id="error-nombre">El nombre es obligatorio.</p> 
               </div> 
               <div class="guest-modal__field" id="field-apellido"> 
                 <label class="guest-modal__label-field" for="guestApellido">Apellido *</label> 
                 <input class="guest-modal__input" type="text" id="guestApellido" name="apellido" placeholder="Apellido"> 
                 <p class="guest-modal__error hidden" id="error-apellido">El apellido es obligatorio.</p> 
               </div> 
             </div> 

             <div class="guest-modal__row"> 
               <div class="guest-modal__field" id="field-documento"> 
                 <label class="guest-modal__label-field" for="guestDocumento">Documento *</label> 
                 <input class="guest-modal__input" type="text" id="guestDocumento" name="documento" placeholder="C.I"> 
                 <p class="guest-modal__error hidden" id="error-documento">El documento es obligatorio.</p> 
               </div> 
               <div class="guest-modal__field" id="field-genero"> 
                 <label class="guest-modal__label-field" for="guestGenero">Género *</label> 
                 <div class="guest-modal__select-wrapper"> 
                   <select class="guest-modal__input guest-modal__select" id="guestGenero" name="genero"> 
                     <option value="">Seleccionar género...</option> 
                     <option value="Masculino">Masculino</option> 
                     <option value="Femenino">Femenino</option> 
                   </select> 
                 </div> 
                 <p class="guest-modal__error hidden" id="error-genero">El género es obligatorio.</p> 
               </div> 
             </div> 
           </form> 

           <div class="guest-modal__footer"> 
             <button class="guest-modal__btn guest-modal__btn--secondary" id="cancelGuestModal">Cancelar</button> 
             <button class="guest-modal__btn guest-modal__btn--primary" id="saveGuestBtn">Guardar huésped</button> 
           </div> 
         </div> 
       </div> 
    `;
  }
}

customElements.define('app-huespedes', Huespedes);
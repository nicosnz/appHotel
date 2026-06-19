export interface HuespedResponse {
    id:        string;
    nombre:    string;
    apellido:  string;
    documento: string;
    genero:    string;
    activo:    boolean;
    reservas:  Reserva[];
}

export interface Reserva {
    id:                    string;
    huespedes:             Huespede[];
    habitacionId:          string;
    estadoReserva:         string;
    fechaCheckInEsperado:  Date;
    fechaCheckOutEsperado: Date;
    fechaCheckInActual:    null;
    fechaCheckOutActual:   null;
    precioTotal:           number;
    habitacion:            null;
}

export interface Huespede {
    id:        string;
    nombre:    string;
    apellido:  string;
    documento: string;
    activo:    boolean;
}

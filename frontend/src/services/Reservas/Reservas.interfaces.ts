export interface ReservaCreateDTO {
    HuespedesIds: string[];
    HabitacionId: string;
    FechaCheckInEsperado: string; 
    FechaCheckOutEsperado: string; 
}
export interface ReservaResponse {
    id:                    string;
    huespedes:             Huespede[];
    habitacionId:          string;
    estadoReserva:         string;
    fechaCheckInEsperado:  Date;
    fechaCheckOutEsperado: Date;
    fechaCheckInActual:    null;
    fechaCheckOutActual:   null;
    precioTotal:           number;
    habitacion:            Habitacion;
}

export interface Habitacion {
    id:                string;
    tipoHabitacion:    string;
    numHabitacion:     string;
    capacidadPersonas: number;
    precio:            number;
    tipoCama:          string;
    piso:              number;
    estadoHabitacion:  string;
}

export interface Huespede {
    id:        string;
    nombre:    string;
    apellido:  string;
    documento: string;
    activo:    boolean;
}

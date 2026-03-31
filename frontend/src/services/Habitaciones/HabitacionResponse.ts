export interface Habitacion {
    id:                string;
    tipoHabitacion:    string;
    numHabitacion:     string;
    capacidadPersonas: number;
    precio:            number;
    tipoCama:          TipoCama;
    piso:              number;
    estadoHabitacion:  EstadoHabitacion;
    reservas:          any[];
}

export enum EstadoHabitacion {
    Libre = "LIBRE",
    Reservada = "RESERVADA",
}

export enum TipoCama {
    Individual = "INDIVIDUAL",
    Matrimonial = "MATRIMONIAL",
}

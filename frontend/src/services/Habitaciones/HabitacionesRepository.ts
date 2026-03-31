import axios from 'axios';
import type { Habitacion } from '../Habitaciones/HabitacionResponse'

const API_URL = 'http://localhost:5004/habitacion'; 

export const getHabitaciones = async (): Promise<Habitacion[]> => {
    try {
        const response = await axios.get<Habitacion[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener habitaciones:", error);
        throw error;
    }
};
export const getHabitacionesDisponibles = async (fechaInicio: string, fechaFin: string): Promise<Habitacion[]> => {
    try {
        const response = await axios.get<Habitacion[]>(`${API_URL}/disponibles`, {
            params: {
                fechaInicio,
                fechaFin
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error al obtener habitaciones disponibles:", error);
        throw new Error("No se pudieron cargar las habitaciones para estas fechas");
    }
};

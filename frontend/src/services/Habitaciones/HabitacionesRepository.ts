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


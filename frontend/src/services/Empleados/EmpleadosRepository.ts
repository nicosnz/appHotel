import axios from 'axios';
import type { EmpleadoResponse } from './EmpleadosResponse';

const URL_BASE = "http://localhost:5004/api/empleados";



export async function getEmpleados(): Promise<EmpleadoResponse[]> {
    try {
        const response = await axios.get<EmpleadoResponse[]>(URL_BASE);
        return response.data;
    } catch (error) {
        console.error("Error al obtener empleados:", error);
        throw new Error("No se pudieron cargar los empleados.");
    }
}
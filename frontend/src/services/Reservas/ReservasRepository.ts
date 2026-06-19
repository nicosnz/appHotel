import api from '../api';
import type { ReservaCreateDTO, ReservaResponse } from './Reservas.interfaces';

const URL_BASE = "/reserva";


export async function crearReserva(data: ReservaCreateDTO): Promise<string> {
    try {
        
        const response = await api.post<string>(URL_BASE, data);
        
        return response.data;
    } catch (error: any) {
        let mensaje = "Error al procesar la reserva";

        if (error.response) {
            try {
                const errorData = typeof error.response.data === 'string' 
                    ? JSON.parse(error.response.data) 
                    : error.response.data;
                mensaje = errorData.mensaje || mensaje;
            } catch {
                mensaje = error.response.data || mensaje;
            }
        }

        throw new Error(mensaje);
    }
}
export async function getTodasLasReservas(): Promise<ReservaResponse[]> {
    try {
        const response = await api.get<ReservaResponse[]>(URL_BASE);
        return response.data;
    } catch (error: any) {
        console.error("Error al obtener reservas:", error);
        throw new Error("No se pudieron cargar las reservas.");
    }
}

export async function getReservasPorEstado(estado: string): Promise<ReservaResponse[]> {
    try {
        const response = await api.get<ReservaResponse[]>(`${URL_BASE}/estado/${estado}`);
        return response.data;
    } catch (error: any) {
        console.error(`Error al obtener reservas por estado ${estado}:`, error);
        throw new Error(`No se pudieron cargar las reservas de tipo ${estado}.`);
    }
}

export async function realizarCheckIn(reservaId: string): Promise<void> {
    try {
        await api.post(`${URL_BASE}/checkIn/${reservaId}`);
    } catch (error: any) {
        console.error("Error en Check-In:", error);
        let mensaje = "No se pudo realizar el check-in";
        if (error.response && error.response.data) {
            mensaje = error.response.data.mensaje || error.response.data;
        }
        throw new Error(mensaje);
    }
}
export async function cancelarReserva(reservaId: string): Promise<void> {
    try {
        await api.post(`${URL_BASE}/cancelar/${reservaId}`);
    } catch (error: any) {
        console.error("Error al cancelar reserva:", error);
        let mensaje = "No se pudo cancelar la reserva";
        
        if (error.response && error.response.data) {
            mensaje = error.response.data.mensaje || error.response.data;
        }
        
        throw new Error(mensaje);
    }
}
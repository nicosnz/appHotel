import axios from 'axios';
import type { HuespedForm } from './../../components/huespedes/HuespedRequets';
import type { HuespedResponse } from './HuespedResponse';

const URL = "http://localhost:5004/huesped";

export async function createHuesped(data: HuespedForm): Promise<string> {
    const response = await axios.post(URL, data, {
        responseType: 'text' 
    });
    return response.data; 
}

export async function getHuespedes(): Promise<HuespedResponse[]> {
    try {
        const response = await axios.get<HuespedResponse[]>(URL);
        
        return response.data;
    } catch (error) {
        console.error("Error al obtener la lista de huéspedes:", error);
        throw new Error("No se pudo cargar la lista de huéspedes");
    }
}
import axios from 'axios';
import type { HuespedForm } from './../../components/huespedes/HuespedRequets';
import type { HuespedResponse } from './HuespedResponse';

const URL = "http://localhost:5004/huesped";

    export async function createHuesped(data: HuespedForm): Promise<string> {
    try {
        const response = await axios.post(URL, data, { responseType: 'text' });
        return response.data;
    } catch (error: any) {
        let mensaje = "Error desconocido";

        if (error.response) {
            
            const data = JSON.parse(error.response.data);
            mensaje = data.mensaje;
            
        } 
        

        throw new Error(mensaje); 
    }
    }
    export async function getHuespedes(): Promise<HuespedResponse[]> {
        try {
            const response = await axios.get<HuespedResponse[]>(URL);
            
            return response.data;
        } catch (error) {
            throw new Error("No se pudo cargar la lista de huéspedes");
        }
    }
    export async function getHuespedesInactivos(): Promise<HuespedResponse[]> {
        try {
            const response = await axios.get<HuespedResponse[]>(`${URL}/inactivos`);
            return response.data;
        } catch (error) {
            throw new Error("No se pudo cargar la lista de huéspedes inactivos");
        }
    }

   

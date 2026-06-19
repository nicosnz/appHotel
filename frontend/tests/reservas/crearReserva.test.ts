
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';

import { crearReserva } from '../../src/services/Reservas/ReservasRepository';

vi.mock('axios');

describe('crearReserva', () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('deberia impedir registrar una reserva si la fecha de salida no es posterior a la fecha de ingreso', async () => {

        const reserva = {
            HuespedesIds: ['1'],
            HabitacionId: '2',
            FechaCheckInEsperado: '2026-05-28',
            FechaCheckOutEsperado: '2026-05-28'
        };

        vi.mocked(axios.post).mockRejectedValue({
            response: {
                data: JSON.stringify({
                    mensaje: 'La fecha de salida debe ser posterior a la fecha de ingreso'
                })
            }
        });

        await expect(crearReserva(reserva))
            .rejects
            .toThrow(
                'La fecha de salida debe ser posterior a la fecha de ingreso'
            );

        expect(axios.post).toHaveBeenCalledWith(
            expect.any(String),
            reserva
        );

    });

});
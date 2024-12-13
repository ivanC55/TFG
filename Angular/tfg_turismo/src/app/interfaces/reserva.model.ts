import { Usuario } from './usuario.model';
import { Alojamiento } from './alojamiento.model';
import { Restaurante } from './restaurante.model';

export interface Reserva {
    idReserva?: number | null;
    usuario?: Usuario | null;
    alojamiento?: Alojamiento | null;
    restaurante?: Restaurante | null;
    fechaReserva: string;
    horaReserva: string;
    numPersonas: number;
    estado: string;
}

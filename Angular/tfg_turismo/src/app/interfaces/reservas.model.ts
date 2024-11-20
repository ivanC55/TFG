import { Usuario } from './usuario.model';
import { Alojamiento } from './alojamiento.model';
import { Restaurante } from './restaurante.model';

export interface Reserva {
    idReserva?: number;
    usuario: Usuario;
    alojamiento: Alojamiento;
    restaurante: Restaurante;
    fechaReserva: string; // Usamos string para compatibilidad con formularios
    horaReserva: string;
    numPersonas: number;
    estado: string;
}

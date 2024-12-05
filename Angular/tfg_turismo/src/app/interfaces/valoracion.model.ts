import { Alojamiento } from "./alojamiento.model";
import { Usuario } from "./usuario.model";

export interface Valoracion {
    idValoracion: number | null;
    usuario: Usuario;
    alojamiento: Alojamiento;
    puntuacion: number;
    comentario: string;
}
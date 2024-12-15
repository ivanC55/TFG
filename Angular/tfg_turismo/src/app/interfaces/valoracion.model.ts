import { Alojamiento } from "./alojamiento.model";
import { Usuario } from "./usuario.model";

export interface Valoracion {
    idValoracion: number | null;
    usuario: Usuario | null;
    alojamiento: Alojamiento | null;
    puntuacion: number;
    comentario: string;
}
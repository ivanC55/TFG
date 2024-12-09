import { Role } from './role.model';

export interface Usuario {
    id?: number;
    username: string;
    nombre: string;
    apellidos: string;
    password: string;
    email: string;
    telefono: string;
    direccion: string;
    rol: Role;
}

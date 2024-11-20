export interface Usuario {
    id?: number; // Opcional, porque en creación no existe
    username: string;
    nombre: string;
    apellidos: string;
    password: string;
    email: string;
    telefono: string;
    direccion: string;
    rol: string;
}

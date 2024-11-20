export interface PuntoDeInteres {
    idPunto: number;
    nombre: string;
    descripcion: string;
    coordenadas: string;
    orden: number;
    ruta: {
        idRuta: number;
        nombre: string; // Para facilitar mostrar datos básicos de la ruta
    } | null;
}

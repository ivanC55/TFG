import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PuntoDeInteres } from '../interfaces/punto-de-interes.model';

@Injectable({
    providedIn: 'root',
})
export class PuntoDeInteresService {
    private apiUrl = 'http://localhost:8081/api/puntos-de-interes';

    constructor(private http: HttpClient) { }

    // Obtener todos los puntos de interés
    getPuntosDeInteres(): Observable<PuntoDeInteres[]> {
        return this.http.get<PuntoDeInteres[]>(this.apiUrl);
    }

    // Obtener punto de interés por ID
    getPuntoDeInteresById(id: number): Observable<PuntoDeInteres> {
        return this.http.get<PuntoDeInteres>(`${this.apiUrl}/${id}`);
    }

    // Crear un nuevo punto de interés
    createPuntoDeInteres(punto: PuntoDeInteres): Observable<PuntoDeInteres> {
        return this.http.post<PuntoDeInteres>(this.apiUrl, punto);
    }

    // Actualizar un punto de interés existente
    updatePuntoDeInteres(id: number, punto: PuntoDeInteres): Observable<PuntoDeInteres> {
        return this.http.put<PuntoDeInteres>(`${this.apiUrl}/${id}`, punto);
    }

    // Eliminar un punto de interés
    deletePuntoDeInteres(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    // Buscar por nombre
    findByNombre(nombre: string): Observable<PuntoDeInteres> {
        return this.http.get<PuntoDeInteres>(`${this.apiUrl}/nombre/${nombre}`);
    }

    uploadImage(id: number, file: File): Observable<string> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<string>(`${this.apiUrl}/upload/${id}`, formData, { responseType: 'json' });
    }
}

// reserva.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../interfaces/reserva.model';

@Injectable({
    providedIn: 'root'
})
export class ReservaService {

    private apiUrl = 'http://localhost:8081/api/reservas';  // URL de tu API

    constructor(private http: HttpClient) { }

    // Obtener todas las reservas
    getReservas(): Observable<Reserva[]> {
        return this.http.get<Reserva[]>(this.apiUrl);
    }
    // Actualizar reserva
    updateReserva(reserva: Reserva): Observable<Reserva> {
        return this.http.put<Reserva>(`${this.apiUrl}/${reserva.idReserva}`, reserva);
    }

    // Crear una nueva reserva
    createReserva(reserva: Reserva): Observable<Reserva> {
        return this.http.post<Reserva>(this.apiUrl, reserva);
    }

    // Eliminar una reserva
    deleteReserva(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    reservarAlojamiento(reserva: any): Observable<any> {
        return this.http.post(this.apiUrl, reserva);
    }
}

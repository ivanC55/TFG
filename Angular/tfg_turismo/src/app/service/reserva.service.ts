// reserva.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../interfaces/reservas.model';

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

    // Crear una nueva reserva
    createReserva(reserva: Reserva): Observable<Reserva> {
        return this.http.post<Reserva>(this.apiUrl, reserva);
    }

    // Eliminar una reserva
    deleteReserva(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}

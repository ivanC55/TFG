import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurante } from '../interfaces/restaurante.model';
@Injectable({
    providedIn: 'root'
})
export class RestauranteService {
    private apiUrl = 'http://localhost:8081/api/restaurantes';

    constructor(private http: HttpClient) { }

    getRestaurantes(): Observable<Restaurante[]> {
        return this.http.get<Restaurante[]>(this.apiUrl);
    }

    getRestauranteById(id: number): Observable<Restaurante> {
        return this.http.get<Restaurante>(`${this.apiUrl}/${id}`);
    }

    createRestaurante(restaurante: Restaurante): Observable<Restaurante> {
        return this.http.post<Restaurante>(this.apiUrl, restaurante);
    }

    updateRestaurante(id: number, restaurante: Restaurante): Observable<Restaurante> {
        return this.http.put<Restaurante>(`${this.apiUrl}/${id}`, restaurante);
    }

    deleteRestaurante(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    getRestaurantesByTipoComida(tipoComida: string): Observable<Restaurante[]> {
        return this.http.get<Restaurante[]>(`${this.apiUrl}/tipoComida/${tipoComida}`);
    }
}

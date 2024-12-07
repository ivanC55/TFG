import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Valoracion } from '../interfaces/valoracion.model';


@Injectable({
    providedIn: 'root'
})
export class ValoracionService {
    private apiUrl = 'http://localhost:8081/api/valoraciones';

    constructor(private http: HttpClient) { }

    getValoraciones(): Observable<Valoracion[]> {
        return this.http.get<Valoracion[]>(this.apiUrl);
    }

    createValoracion(valoracion: Valoracion): Observable<Valoracion> {
        return this.http.post<Valoracion>(this.apiUrl, valoracion);
    }

    updateValoracion(valoracion: Valoracion): Observable<Valoracion> {
        return this.http.put<Valoracion>(`${this.apiUrl}/${valoracion.idValoracion}`, valoracion);
    }

    deleteValoracion(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    dejarValoracion(valoracion: any): Observable<any> {
        return this.http.post(this.apiUrl, valoracion);
    }
}
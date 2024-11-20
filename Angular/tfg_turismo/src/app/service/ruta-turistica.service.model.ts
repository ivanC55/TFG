import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RutaTuristica } from '../interfaces/ruta-turistica.model';

@Injectable({
    providedIn: 'root',
})
export class RutaTuristicaService {
    private baseUrl = 'http://localhost:8081/api/rutas-turisticas';

    constructor(private http: HttpClient) { }

    getRutas(): Observable<RutaTuristica[]> {
        return this.http.get<RutaTuristica[]>(this.baseUrl);
    }

    getRutaById(id: number): Observable<RutaTuristica> {
        return this.http.get<RutaTuristica>(`${this.baseUrl}/${id}`);
    }

    createRuta(ruta: RutaTuristica): Observable<RutaTuristica> {
        return this.http.post<RutaTuristica>(this.baseUrl, ruta);
    }

    updateRuta(id: number, ruta: RutaTuristica): Observable<RutaTuristica> {
        return this.http.put<RutaTuristica>(`${this.baseUrl}/${id}`, ruta);
    }

    deleteRuta(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}

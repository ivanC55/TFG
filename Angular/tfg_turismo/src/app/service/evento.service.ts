import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../interfaces/evento.model';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  private apiUrl = 'http://localhost:8081/api/eventos'; // Cambia según tu configuración

  constructor(private http: HttpClient) {}

  // Obtener todos los eventos culturales
  getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  }

  // Obtener un evento cultural por su ID
  getEventoById(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo evento cultural
  createEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.apiUrl, evento);
  }

  // Actualizar un evento cultural existente
  updateEvento(id: number, evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${this.apiUrl}/${id}`, evento);
  }

  // Eliminar un evento cultural
  deleteEvento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

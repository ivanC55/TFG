import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../interfaces/evento.model';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  private apiUrl = 'http://localhost:8081/api/eventos'; // Cambia según tu configuración

  constructor(private http: HttpClient) {}

  // Método para obtener el token de localStorage
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Recupera el token almacenado
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Incluye el token en el encabezado
    });
  }

  // Obtener todos los eventos culturales
  getEventos(): Observable<Evento[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Evento[]>(this.apiUrl, { headers });
  }

  // Obtener un evento cultural por su ID
  getEventoById(id: number): Observable<Evento> {
    const headers = this.getAuthHeaders();
    return this.http.get<Evento>(`${this.apiUrl}/${id}`, { headers });
  }

  // Crear un nuevo evento cultural
  createEvento(evento: Evento): Observable<Evento> {
    const headers = this.getAuthHeaders();
    return this.http.post<Evento>(this.apiUrl, evento, { headers });
  }

  // Actualizar un evento cultural existente
  updateEvento(id: number, evento: Evento): Observable<Evento> {
    const headers = this.getAuthHeaders();
    return this.http.put<Evento>(`${this.apiUrl}/${id}`, evento, { headers });
  }

  // Eliminar un evento cultural
  deleteEvento(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }
}

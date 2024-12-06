import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alojamiento } from '../interfaces/alojamiento.model';

@Injectable({
  providedIn: 'root',
})
export class AlojamientoService {
  private apiUrl = 'http://localhost:8081/api/alojamientos';

  constructor(private http: HttpClient, private injector: Injector) { }
  
  getAlojamientosList(): Observable<Alojamiento[]> {
    return this.http.get<Alojamiento[]>(this.apiUrl);
  }

  createAlojamiento(alojamiento: Alojamiento): Observable<Alojamiento> {
    return this.http.post<Alojamiento>(this.apiUrl, alojamiento);
  }

  updateAlojamiento(alojamiento: Alojamiento): Observable<Alojamiento> {
    const url = `${this.apiUrl}/${alojamiento.idAlojamiento}`;
    return this.http.put<Alojamiento>(url, alojamiento);
  }

  deleteAlojamiento(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  getAlojamientoById(id: number): Observable<Alojamiento> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Alojamiento>(url);
  }

  uploadImage(id: number, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<string>(`${this.apiUrl}/upload/${id}`, formData, { responseType: 'json' });
  }
  
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MonumentoHistorico } from '../interfaces/monumento-historico.model';

@Injectable({
  providedIn: 'root'
})
export class MonumentoHistoricoService {
  private apiUrl = 'http://localhost:8081/api/monumentos';

  constructor(private http: HttpClient) {}

  getMonumentos(): Observable<MonumentoHistorico[]> {
    return this.http.get<MonumentoHistorico[]>(this.apiUrl);
  }

  getMonumentoById(id: number): Observable<MonumentoHistorico> {
    return this.http.get<MonumentoHistorico>(`${this.apiUrl}/${id}`);
  }

  createMonumento(monumento: MonumentoHistorico): Observable<MonumentoHistorico> {
    return this.http.post<MonumentoHistorico>(this.apiUrl, monumento);
  }

  updateMonumento(id: number, monumento: MonumentoHistorico): Observable<MonumentoHistorico> {
    return this.http.put<MonumentoHistorico>(`${this.apiUrl}/${id}`, monumento);
  }

  deleteMonumento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  uploadImage(id: number, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<string>(`${this.apiUrl}/upload/${id}`, formData);
  }
}

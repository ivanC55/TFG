import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../interfaces/loginResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8081/api/auth';  // URL de la API de login

  constructor(private http: HttpClient) { }

  // Método para hacer login
  login(username: string, password: string): Observable<LoginResponse> {
    const body = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, body, { headers }).pipe(
      tap(response => {
        this.saveToken(response.token);  // Guardamos el token
      })
    );
  }

  register(username: string, nombre: string, apellidos: string, email: string, telefono: string, direccion: string, rol: string, password: string): Observable<any> {
    const user = { username, nombre, apellidos, email, telefono, direccion, rol, password };
    return this.http.post(`${this.apiUrl}/register`, user);  // Aquí usamos la URL de registro
  }

  getToken(): string | null {
    return localStorage.getItem('token');  
  }

  
  saveToken(token: string): void {
    localStorage.setItem('token', token);  
  }

  
  logout(): void {
    localStorage.removeItem('token');  
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;  
  }
}

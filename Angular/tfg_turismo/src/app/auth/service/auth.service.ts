import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, throwError } from 'rxjs';
import { LoginResponse } from '../interfaces/loginResponse.model';
import { Usuario } from '../../interfaces/usuario.model';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8081/api/auth'; 

  constructor(private http: HttpClient) { }

  // Método para hacer login
  login(username: string, password: string): Observable<LoginResponse> {
    const body = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, body, { headers }).pipe(
      tap(response => {
        console.log('Respuesta del servidor:', response);
        if (response && response.token) {
          this.saveToken(response.token);  // Guardamos el token
        }
      })
    );
  }

  register(username: string, nombre: string, apellidos: string, email: string, telefono: string, direccion: string, rol: string, password: string): Observable<any> {
    const user = { username, nombre, apellidos, email, telefono, direccion, rol, password };
    return this.http.post(`${this.apiUrl}/register`, user);  
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
    console.log('Token guardado en localStorage:', token);
  }

  // Método para obtener el token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isTokenExpired(token: string): boolean {
    const decoded: any = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;  
  }

  // Método para obtener el rol del usuario decodificando el token
  getRole(): string {
    const token = this.getToken();
    if (token && token !== '') {
      try {
        const decodedToken = jwt_decode(token) as any;
        console.log('Decoded Token:', decodedToken);  // Deberías ver el rol en este log
        return decodedToken.role || '';  // Acceder al rol desde el claim 'role'
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        return '';  
      }
    }
    return '';  // Si no hay token, devolver vacío
  }
  

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  // Método para obtener el usuario logueado
  getUsuarioLogueado(): Observable<Usuario> {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      });

      return this.http.get<Usuario>(`${this.apiUrl}/usuario`, { headers }).pipe(
        catchError((error) => {
          console.error('Error obteniendo el usuario logueado:', error);
          return throwError(() => new Error('Usuario no autenticado.'));
        })
      );
    } else {
      return throwError(() => new Error('Usuario no autenticado.'));
    }
  }

  // Método para hacer logout
  logout(): void {
    localStorage.removeItem('token');
  }
}

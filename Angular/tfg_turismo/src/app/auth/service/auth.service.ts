import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '../interfaces/loginResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8081/api/auth/login'; 

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<LoginResponse> {
    const body = { username, password };
    console.log('Request Body:', body);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.post<LoginResponse>(this.apiUrl, body, {
      headers
    }).pipe(
      tap(response => {
        this.saveToken(response.token);
      })
    )
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token');
    }
    return null;
  }

  saveToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('token', token);
    }
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
    }
  }
}

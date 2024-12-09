import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { LoginResponse } from '../../interfaces/loginResponse.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response); // Verifica si el token está presente
        const token = response.token;
        if (token) {
          this.authService.saveToken(token);
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Error: No se recibió un token válido.';
        }
      },
      error: (err) => {
        if (err.status === 404) {
          this.errorMessage = 'El usuario no existe. Por favor, verifica los datos.';
        } else if (err.status === 401) {
          this.errorMessage = 'Usuario o contraseña inválidas. Inténtalo de nuevo.';
        } else {
          this.errorMessage = 'Ocurrió un error inesperado. Inténtalo más tarde.';
        }
      },
    });
  }
  
}

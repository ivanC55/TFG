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
        const token = response.token; // Asegúrate de que el backend devuelva el token en esta propiedad
        this.authService.saveToken(token);
        this.router.navigate(['/home']); // Redirige al home
      },
      error: (err) => {
        this.errorMessage = 'Credenciales inválidas'; // Manejar errores
      },
    });
  }
}

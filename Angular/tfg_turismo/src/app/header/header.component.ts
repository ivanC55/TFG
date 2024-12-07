import { Component } from '@angular/core';
import { Router } from '@angular/router';  // Asegúrate de importar Router
import { AuthService } from '../auth/service/auth.service';  // Asegúrate de importar el servicio de autenticación

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isAuthenticated: boolean;

  constructor(private authService: AuthService) {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  // Método de logout
  logout() {
    this.authService.logout();
    this.isAuthenticated = false;  // Cambiar estado a no autenticado
  }
}

import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../../../interfaces/usuario.model'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  usuario: Usuario = {
    username: '',
    nombre: '',
    apellidos: '',
    password: '',
    email: '',
    telefono: '',
    direccion: '',
    rol: 'user',    
  };

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onRegister(): void {
    this.authService.register(
      this.usuario.username,
      this.usuario.nombre,
      this.usuario.apellidos,
      this.usuario.email,
      this.usuario.telefono,
      this.usuario.direccion,
      this.usuario.rol,
      this.usuario.password
    ).subscribe({
      next: (response) => {
        console.log('Registro exitoso', response);
        this.router.navigate(['/login']);  
      },
      error: (err) => {
        this.errorMessage = 'Hubo un error al crear la cuenta. Intenta de nuevo.';  
        console.error(err);
      },
    });
  }
}

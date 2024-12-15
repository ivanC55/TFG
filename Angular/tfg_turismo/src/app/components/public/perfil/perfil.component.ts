import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/service/auth.service'; // Importa tu servicio de autenticación
import { Usuario } from '../../../interfaces/usuario.model'; // Importa el modelo del usuario

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuarioLogueado: Usuario | undefined = undefined;  // Inicializa como undefined o un objeto vacío

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Obtener los detalles del usuario logueado
    this.authService.getUsuarioLogueado().subscribe(
      (usuario) => {
        this.usuarioLogueado = usuario;
        console.log('Usuario logueado:', this.usuarioLogueado);  
        console.log('Reservas del usuario:', this.usuarioLogueado?.reservas);  // Verifica que las reservas están presentes
      },
      (error) => {
        console.error('Error al obtener el usuario logueado:', error);
      }
    );
  }
}

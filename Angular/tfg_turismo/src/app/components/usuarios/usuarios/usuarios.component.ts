import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../service/usuario.service';
import { Usuario } from '../../../interfaces/usuario.model'; // Asumiendo que esta es la ruta correcta
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioSeleccionado: Usuario = {
    id: 0,
    username: '',
    nombre: '',
    apellidos: '',
    password: '',
    email: '',
    telefono: '',
    direccion: '',
    rol: {
      id: 0,
      name: ''
    },
    reservas: []
  };
  modoFormulario = false;
  modoEdicion = false; // Controla si el modal de edición está visible
  usuarioParaEliminar: Usuario | null = null;

  roles: any[] = [];

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe((data) => (this.usuarios = data));
  }

  verDetalles(id: number): void {
    this.router.navigate(['/usuarios', id]);
  }

  mostrarFormulario(): void {
    this.modoEdicion = true;
    this.usuarioSeleccionado = {
      id: 0,
      username: '',
      nombre: '',
      apellidos: '',
      password: '',
      email: '',
      telefono: '',
      direccion: '',
      rol: {
        id: 0,
        name: ''
      },
      reservas:[],
    };
    this.modoFormulario = true;
  }

  editarUsuario(usuario: Usuario): void {
    this.usuarioSeleccionado = { ...usuario };
    this.modoEdicion = true; 
  }

  cancelarEdicion(): void {
    this.modoEdicion = false; 
  }

  guardarUsuario(usuario: Usuario): void {
    if (!usuario.username || !usuario.nombre || !usuario.email || !usuario.password || !usuario.rol) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (usuario.id) {
      this.usuarioService.updateUsuario(usuario.id, usuario).subscribe(() => {
        this.modoEdicion = false;
        this.cargarUsuarios();
      });
    } else {
      this.usuarioService.createUsuario(usuario).subscribe(() => {
        this.modoEdicion = false;
        this.cargarUsuarios();
      });
    }
    console.log('Usuario guardado:', usuario);
    this.modoEdicion = false;
  }

  mostrarModalEliminar(usuario: Usuario): void {
    this.usuarioParaEliminar = usuario; 
  }

  cancelarEliminar(): void {
    this.usuarioParaEliminar = null; 
  }

  confirmarEliminar(): void {
    if (this.usuarioParaEliminar && this.usuarioParaEliminar.id !== undefined) {
      this.usuarioService.deleteUsuario(this.usuarioParaEliminar.id).subscribe(() => {
        this.usuarioParaEliminar = null; 
        this.cargarUsuarios(); 
      });
    } else {
      console.error('El ID del usuario no está definido');
    }
  }
}

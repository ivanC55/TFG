import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../interfaces/usuario.model';
import { UsuarioService } from '../../../service/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarioSeleccionado: Usuario = {
    username: '',
    nombre: '',
    apellidos: '',
    password: '',
    email: '',
    telefono: '',
    direccion: '',
    rol: '',
  };
  modoFormulario = false;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

  mostrarFormulario(usuario?: Usuario): void {
    this.usuarioSeleccionado = usuario
      ? { ...usuario }
      : {
        username: '',
        nombre: '',
        apellidos: '',
        password: '',
        email: '',
        telefono: '',
        direccion: '',
        rol: '',
      };
    this.modoFormulario = true;
  }

  guardarUsuario(): void {
    if (!this.usuarioSeleccionado) return;

    if (this.usuarioSeleccionado.id) {
      this.usuarioService
        .updateUsuario(this.usuarioSeleccionado.id, this.usuarioSeleccionado)
        .subscribe(() => {
          this.modoFormulario = false;
          this.cargarUsuarios();
        });
    } else {
      this.usuarioService.createUsuario(this.usuarioSeleccionado).subscribe(() => {
        this.modoFormulario = false;
        this.cargarUsuarios();
      });
    }
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Deseas eliminar este usuario?')) {
      this.usuarioService.deleteUsuario(id).subscribe(() => {
        this.cargarUsuarios();
      });
    }
  }

  cancelarFormulario(): void {
    this.usuarioSeleccionado = {
      username: '',
      nombre: '',
      apellidos: '',
      password: '',
      email: '',
      telefono: '',
      direccion: '',
      rol: '',
    };
    this.modoFormulario = false;
  }
}

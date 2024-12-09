import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../../../interfaces/usuario.model';
import { Role } from '../../../interfaces/role.model';
import { RoleService } from '../../../service/role.service';

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
    rol: {
      id: 0,
      name: ''
    },
  };

  confirmPassword: string = '';
  roles: Role[] = [];
  errorMessage: string = '';

  emailPattern: string = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
  telefonoPattern: string = "^[0-9]{9}$";

  emailInvalid: boolean = false;
  telefonoInvalid: boolean = false;
  passwordMismatch: boolean = false;

  ngOnInit(): void {
    this.loadRoles();
  }

  constructor(private authService: AuthService, private router: Router, private roleService: RoleService,) { }

  onRegister(): void {
    this.emailInvalid = false;
    this.telefonoInvalid = false;
    this.passwordMismatch = false;
    this.errorMessage = '';

    if (this.usuario.password !== this.confirmPassword) {
      this.passwordMismatch = true;
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    const telefonoValido = new RegExp(this.telefonoPattern).test(this.usuario.telefono);
    if (!telefonoValido) {
      this.telefonoInvalid = true;
      this.errorMessage = 'El teléfono debe tener exactamente 9 dígitos.';
      return;
    }

    const emailValido = new RegExp(this.emailPattern).test(this.usuario.email);
    if (!emailValido) {
      this.emailInvalid = true;
      this.errorMessage = 'Por favor, ingresa un correo electrónico válido.';
      return;
    }

    this.usuario.rol = {
      id: 1,
      name: 'USER'
    };

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

  loadRoles(): void {
    this.roleService.getRoles().subscribe({
      next: (roles) => {
        this.roles = roles; 
      },
      error: (err) => {
        console.error('Error al cargar los roles', err);
        this.errorMessage = 'Hubo un error al cargar los roles. Intenta de nuevo.';
      }
    });
  }
}


import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../service/usuario.service';
import { AlojamientoService } from '../../service/alojamiento.service';
import { ValoracionService } from '../../service/valoracion.service';
import { Usuario } from '../../interfaces/usuario.model';
import { Alojamiento } from '../../interfaces/alojamiento.model';
import { Valoracion } from '../../interfaces/valoracion.model';
@Component({
  selector: 'app-valoraciones',
  templateUrl: './valoraciones.component.html',
  styleUrls: ['./valoraciones.component.css']
})
export class ValoracionesComponent implements OnInit {
  valoraciones: Valoracion[] = [];
  usuarios: Usuario[] = [];
  alojamientos: Alojamiento[] = [];
  valoracionSeleccionada: Valoracion = this.inicializarValoracion();
  modoFormulario: boolean = false;
  modoEdicion: boolean = false;
  valoracionParaEliminar: Valoracion | null = null;
  
  usuarioSeleccionadoId: number | null = null;
  alojamientoSeleccionadoId: number | null = null;

  constructor(
    private valoracionService: ValoracionService,
    private usuarioService: UsuarioService,
    private alojamientoService: AlojamientoService
  ) { }

  ngOnInit(): void {
    this.cargarValoraciones();
    this.cargarUsuarios();
    this.cargarAlojamientos();
  }

  inicializarValoracion(): Valoracion {
    return {
      idValoracion: null,
      usuario: { id: undefined, username: '', nombre: '', apellidos: '', password: '', email: '', telefono: '', direccion: '', rol: '' },
      alojamiento: {
        idAlojamiento: undefined, nombre: '',
        tipo: '',
        ubicacion: '',
        precioNoche: 0,
        servicios: [],
        puntuacion: 0
      },
      puntuacion: 0,
      comentario: ''
    };
  }

  cargarValoraciones(): void {
    this.valoracionService.getValoraciones().subscribe((data) => {
      this.valoraciones = data;
    });
  }

  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

  cargarAlojamientos(): void {
    this.alojamientoService.getAlojamientosList().subscribe((data) => {
      this.alojamientos = data;
    });
  }

  mostrarFormulario(): void {
    this.modoFormulario = true;
    this.modoEdicion = false;
    this.valoracionSeleccionada = this.inicializarValoracion();
  }

  editarValoracion(valoracion: Valoracion): void {
    this.valoracionSeleccionada = { ...valoracion };
    this.modoEdicion = true;
    this.modoFormulario = true;
    this.usuarioSeleccionadoId = valoracion.usuario?.id || null;
    this.alojamientoSeleccionadoId = valoracion.alojamiento?.idAlojamiento || null;
  }

  guardarValoracion(): void {
    const valoracion: any = {
      idValoracion: this.valoracionSeleccionada.idValoracion,
      usuario: { id: this.usuarioSeleccionadoId },
      alojamiento: { idAlojamiento: this.alojamientoSeleccionadoId },
      puntuacion: this.valoracionSeleccionada.puntuacion,
      comentario: this.valoracionSeleccionada.comentario
    };

    if (this.valoracionSeleccionada.idValoracion) {
      this.valoracionService.updateValoracion(valoracion).subscribe(() => {
        this.cargarValoraciones();
        this.cancelarFormulario();
      });
    } else {
      this.valoracionService.createValoracion(valoracion).subscribe(() => {
        this.cargarValoraciones();
        this.cancelarFormulario();
      });
    }
  }

  mostrarModalEliminar(valoracion: Valoracion): void {
    this.valoracionParaEliminar = valoracion;
  }

  cancelarEliminar(): void {
    this.valoracionParaEliminar = null;
  }

  confirmarEliminar(): void {
    if (this.valoracionParaEliminar) {
      this.valoracionService.deleteValoracion(this.valoracionParaEliminar.idValoracion!).subscribe(() => {
        this.valoracionParaEliminar = null;
        this.cargarValoraciones();
      });
    }
  }

  cancelarFormulario(): void {
    this.modoFormulario = false;
    this.valoracionSeleccionada = this.inicializarValoracion();
    this.usuarioSeleccionadoId = null;
    this.alojamientoSeleccionadoId = null;
  }
}
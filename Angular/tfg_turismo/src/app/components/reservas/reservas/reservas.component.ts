import { Component, OnInit } from '@angular/core';
import { Reserva } from '../../../interfaces/reserva.model';
import { Usuario } from '../../../interfaces/usuario.model';
import { Alojamiento } from '../../../interfaces/alojamiento.model';
import { Restaurante } from '../../../interfaces/restaurante.model';
import { ReservaService } from '../../../service/reserva.service';
import { UsuarioService } from '../../../service/usuario.service';
import { AlojamientoService } from '../../../service/alojamiento.service';
import { RestauranteService } from '../../../service/restaurante.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {
  reservas: Reserva[] = [];
  usuarios: Usuario[] = [];
  alojamientos: Alojamiento[] = [];
  restaurantes: Restaurante[] = [];
  reservaSeleccionada: Reserva = this.inicializarReserva();  
  modoFormulario: boolean = false;
  modoEdicion: boolean = false;  // Para editar
  reservaParaEliminar: Reserva | null = null;  // Para eliminar reserva

  // Campos de selección de id
  usuarioSeleccionadoId: number | null = null;
  alojamientoSeleccionadoId: number | null = null;
  restauranteSeleccionadoId: number | null = null;

  constructor(
    private reservaService: ReservaService,
    private usuarioService: UsuarioService,
    private alojamientoService: AlojamientoService,
    private restauranteService: RestauranteService
  ) { }

  ngOnInit(): void {
    this.cargarReservas();
    this.cargarUsuarios();
    this.cargarAlojamientos();
    this.cargarRestaurantes();
  }

  inicializarReserva(): Reserva {
    return {
      idReserva: undefined,
      usuario: {
        id: undefined, username: '', nombre: '', apellidos: '', password: '', email: '', telefono: '', direccion: '', rol: {
          id: 0,
          name: ''
        },
        reservas: []
      },
      alojamiento: null,
      restaurante: null,
      fechaReserva: '',
      horaReserva: '',
      numPersonas: 1,
      estado: ''
    };
  }

  cargarReservas(): void {
    this.reservaService.getReservas().subscribe((data) => {
      this.reservas = data;
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

  cargarRestaurantes(): void {
    this.restauranteService.getRestaurantes().subscribe((data) => {
      this.restaurantes = data;
    });
  }

  mostrarFormulario(): void {
    this.modoFormulario = true;
    this.modoEdicion = false;
    this.reservaSeleccionada = this.inicializarReserva();
  }

  editarReserva(reserva: Reserva): void {
    this.reservaSeleccionada = { ...reserva };
    this.modoEdicion = true;  // Mostrar formulario para edición
    this.modoFormulario = true;  // Abrir el formulario
    this.usuarioSeleccionadoId = reserva.usuario?.id || null;
    this.alojamientoSeleccionadoId = reserva.alojamiento?.idAlojamiento || null;
    this.restauranteSeleccionadoId = reserva.restaurante?.idRestaurante || null;
  }

  guardarReserva(): void {
    const reserva: any = {
      idReserva: this.reservaSeleccionada.idReserva,
      usuario: { id: this.usuarioSeleccionadoId }, // Solo enviar el ID
      alojamiento: this.alojamientoSeleccionadoId ? { idAlojamiento: this.alojamientoSeleccionadoId } : null,
      restaurante: this.restauranteSeleccionadoId ? { idRestaurante: this.restauranteSeleccionadoId } : null,
      fechaReserva: this.reservaSeleccionada.fechaReserva,
      horaReserva: this.reservaSeleccionada.horaReserva,
      numPersonas: this.reservaSeleccionada.numPersonas,
      estado: this.reservaSeleccionada.estado
    };
    
    if (this.reservaSeleccionada.idReserva) {
      this.reservaService.updateReserva(reserva).subscribe(() => {
        this.cargarReservas();
        this.cancelarFormulario();
      });
    } else {
      this.reservaService.createReserva(reserva).subscribe(() => {
        this.cargarReservas();
        this.cancelarFormulario();
      });
    }
  }

  mostrarModalEliminar(reserva: Reserva): void {
    this.reservaParaEliminar = reserva;  // Seleccionar la reserva para eliminar
  }

  cancelarEliminar(): void {
    this.reservaParaEliminar = null;  // Cerrar el modal de eliminación sin hacer nada
  }

  confirmarEliminar(): void {
    if (this.reservaParaEliminar) {
      this.reservaService.deleteReserva(this.reservaParaEliminar.idReserva!).subscribe(() => {
        this.reservaParaEliminar = null;
        this.cargarReservas();
      });
    }
  }

  cancelarFormulario(): void {
    this.modoFormulario = false;
    this.reservaSeleccionada = this.inicializarReserva();
    this.usuarioSeleccionadoId = null;
    this.alojamientoSeleccionadoId = null;
    this.restauranteSeleccionadoId = null;
  }
}

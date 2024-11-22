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
  reservaSeleccionada: Reserva = this.inicializarReserva();  // Cambiado a reservaSeleccionada
  modoFormulario: boolean = false;

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

  // Inicializar una nueva reserva
  inicializarReserva(): Reserva {
    return {
      idReserva: undefined,
      usuario: {
        id: undefined,
        username: '',
        nombre: '',
        apellidos: '',
        password: '',
        email: '',
        telefono: '',
        direccion: '',
        rol: ''
      },
      alojamiento: {
        idAlojamiento: undefined, nombre: '', ubicacion: '', precioNoche: 0,
        tipo: '',
        servicios: '',
        puntuacion: 0
      },
      restaurante: {
        idRestaurante: undefined, nombre: '', ubicacion: '',
        tipoComida: '',
        especialidad: '',
        precioPromedio: 0,
        horario: '',
        puntuacion: 0
      },
      fechaReserva: '',
      horaReserva: '',
      numPersonas: 1,
      estado: ''
    };
  }

  // Cargar todas las reservas
  cargarReservas(): void {
    this.reservaService.getReservas().subscribe((data) => {
      this.reservas = data;
    });
  }

  // Cargar todos los usuarios
  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

  // Cargar todos los alojamientos
  cargarAlojamientos(): void {
    this.alojamientoService.getAlojamientosList().subscribe((data) => {
      this.alojamientos = data;
    });
  }

  // Cargar todos los restaurantes
  cargarRestaurantes(): void {
    this.restauranteService.getRestaurantes().subscribe((data) => {
      this.restaurantes = data;
    });
  }

  // Mostrar el formulario para crear o editar una reserva
  mostrarFormulario(reserva?: Reserva): void {
    this.reservaSeleccionada = reserva ? { ...reserva } : this.inicializarReserva();
    this.modoFormulario = true;
  }

  // Guardar o actualizar una reserva
  guardarReserva(): void {
    const reserva: any = {
      idReserva: this.reservaSeleccionada.idReserva,
      usuario: { id: this.reservaSeleccionada.usuario.id }, // Solo enviar el ID
      alojamiento: { idAlojamiento: this.reservaSeleccionada.alojamiento.idAlojamiento }, // Solo enviar el ID
      restaurante: this.reservaSeleccionada.restaurante.idRestaurante
        ? { idRestaurante: this.reservaSeleccionada.restaurante.idRestaurante } // Solo enviar el ID si está presente
        : null,
      fechaReserva: this.reservaSeleccionada.fechaReserva,
      horaReserva: this.reservaSeleccionada.horaReserva,
      numPersonas: this.reservaSeleccionada.numPersonas,
      estado: this.reservaSeleccionada.estado
    };
  
    console.log('Payload enviado:', reserva); // Verificar antes de enviar
  
    this.reservaService.createReserva(reserva).subscribe(
      (data) => {
        console.log('Reserva guardada exitosamente', data);
        this.cargarReservas();
        this.cancelarFormulario();
      },
      (error) => {
        console.error('Error al guardar la reserva', error);
        alert('Error al guardar la reserva: ' + error.message);
      }
    );
  }
  

  // Eliminar una reserva
  eliminarReserva(idReserva: number | null): void {
    if (idReserva) {
      this.reservaService.deleteReserva(idReserva).subscribe(() => {
        this.cargarReservas();
      });
    }
  }

  // Cancelar el formulario
  cancelarFormulario(): void {
    this.modoFormulario = false;
    this.reservaSeleccionada = this.inicializarReserva();
  }
}

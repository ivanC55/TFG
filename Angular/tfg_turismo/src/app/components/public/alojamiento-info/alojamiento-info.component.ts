import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlojamientoService } from '../../../service/alojamiento.service';
import { ValoracionService } from '../../../service/valoracion.service';
import { ReservaService } from '../../../service/reserva.service';
import { AuthService } from '../../../auth/service/auth.service';
import { Valoracion } from '../../../interfaces/valoracion.model';
import { Alojamiento } from '../../../interfaces/alojamiento.model';
import { Usuario } from '../../../interfaces/usuario.model';
import { Reserva } from '../../../interfaces/reserva.model';

@Component({
  selector: 'app-alojamiento-info',
  templateUrl: './alojamiento-info.component.html',
  styleUrls: ['./alojamiento-info.component.css']
})
export class AlojamientoInfoComponent implements OnInit {
  alojamiento: Alojamiento | null = null;
  valoraciones: Valoracion[] = [];
  valoracionesFiltradas: Valoracion[] = [];
  alojamientoSeleccionado: Alojamiento | null = null;
  usuarioLogueado: Usuario | undefined;

  // Formularios
  mostrarFormularioReserva: boolean = false;
  mostrarFormularioValoracion: boolean = false;
  mostrarModalReserva: boolean = false; // Para mostrar el modal de reserva
  mostrarModalValoracion: boolean = false; // Para mostrar el modal de valoración
  reserva: Reserva = {
    fechaInicio: '',
    fechaFin: '',
    horaEntrada: '',
    numPersonas: 0,
    estado: 'pendiente',
    usuario: null,
    alojamiento: null
  };
  valoracion: Valoracion = {
    puntuacion: 0,
    comentario: '',
    usuario: {
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
    },
    alojamiento: {
      nombre: '',
      tipo: '',
      ubicacion: '',
      precioNoche: 0,
      servicios: [],
      puntuacion: 0,
      imagen: ''
    },
    idValoracion: null
  };

  constructor(
    private route: ActivatedRoute,
    private alojamientoService: AlojamientoService,
    private valoracionService: ValoracionService,
    private reservaService: ReservaService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      // Obtener los detalles del alojamiento
      this.alojamientoService.getAlojamientoById(id).subscribe(
        (data) => {
          this.alojamiento = data;
          this.alojamientoSeleccionado = data;
          console.log('Alojamiento cargado:', this.alojamiento);
        },
        (error) => {
          console.error('Error al obtener los detalles del alojamiento:', error);
        }
      );

      // Obtener el usuario logueado
      this.authService.getUsuarioLogueado().subscribe(
        (usuario) => {
          this.usuarioLogueado = usuario;
          console.log('Usuario logueado:', this.usuarioLogueado);
        },
        (error) => {
          console.error('Error al obtener el usuario logueado:', error);
        }
      );
    }
  }

  realizarReserva(): void {
    console.log('Datos de la reserva:', this.reserva);
    console.log('Usuario logueado:', this.usuarioLogueado);

    // Validación de los campos
    if (!this.reserva.fechaInicio) {
      alert('Por favor, complete la fecha de la reserva.');
      return;
    }
    if (!this.reserva.fechaFin) {
      alert('Por favor, seleccione la fecha de fin.');
      return;
    }
    if (!this.reserva.horaEntrada) {
      alert('Por favor, seleccione la hora de entrada.');
      return;
    }
    if (!this.reserva.numPersonas) {
      alert('Por favor, ingrese el número de personas.');
      return;
    }
    if (!this.alojamientoSeleccionado) {
      alert('No se ha seleccionado un alojamiento.');
      return;
    }
    if (!this.usuarioLogueado) {
      alert('Debe iniciar sesión para realizar la reserva.');
      return;
    }

    // Asegurarse de que las fechas estén en el formato adecuado
    const fechaInicioFormatted = new Date(this.reserva.fechaInicio).toISOString().split('T')[0]; // yyyy-MM-dd
    const fechaFinFormatted = new Date(this.reserva.fechaFin).toISOString().split('T')[0]; // yyyy-MM-dd
    const [hour, minute] = this.reserva.horaEntrada.split(':');
    const currentDate = new Date(); // Usar la fecha actual
    currentDate.setHours(Number(hour), Number(minute), 0, 0); // Establecer la hora

    const horaReservaFormatted = currentDate.toISOString().split('T')[1].split('.')[0]; // "HH:mm:ss"

    // Crear el objeto de reserva con los objetos completos
    const reservaData: Reserva = {
      fechaInicio: fechaInicioFormatted,
      fechaFin: fechaFinFormatted,
      horaEntrada: horaReservaFormatted,
      numPersonas: this.reserva.numPersonas,
      estado: 'pendiente',
      usuario: { ...this.usuarioLogueado }, // Objeto completo de usuario
      alojamiento: { ...this.alojamientoSeleccionado } // Objeto completo de alojamiento
    };

    console.log('Datos de la reserva que se enviarán al backend:', reservaData);

    // Enviar la solicitud de reserva
    this.reservaService.createReserva(reservaData).subscribe(
      (response) => {
        console.log('Reserva realizada con éxito', response);
        this.mostrarFormularioReserva = false;
        this.mostrarModalReserva = true; // Mostrar modal de éxito
      },
      (error) => {
        console.error('Error al realizar la reserva:', error);
        alert('Hubo un error al realizar la reserva. Intente nuevamente.');
      }
    );
  }

  dejarValoracion(): void {
    console.log('Datos de la valoración:', this.valoracion);
    if (!this.valoracion.puntuacion || !this.valoracion.comentario || !this.alojamientoSeleccionado || !this.usuarioLogueado) {
      alert('Por favor, complete todos los campos para dejar una valoración.');
      return;
    }

    const valoracionData: Valoracion = {
      puntuacion: this.valoracion.puntuacion,
      comentario: this.valoracion.comentario,
      usuario: { ...this.usuarioLogueado },
      alojamiento: { ...this.alojamientoSeleccionado },
      idValoracion: null
    };

    this.valoracionService.createValoracion(valoracionData).subscribe(
      (response) => {
        console.log('Valoración enviada con éxito:', response);
        this.mostrarModalValoracion = true; // Mostrar modal de éxito
        this.valoracionesFiltradas.push(response);
        this.mostrarFormularioValoracion = false;
      },
      (error) => {
        console.error('Error al enviar la valoración:', error);
        alert('Hubo un error al enviar la valoración. Inténtelo nuevamente.');
      }
    );
  }

  cerrarModalReserva(): void {
    this.mostrarModalReserva = false; // Cerrar modal de reserva
  }

  cerrarModalValoracion(): void {
    this.mostrarModalValoracion = false; // Cerrar modal de valoración
  }

  abrirFormularioReserva(): void {
    if (!this.usuarioLogueado || !this.usuarioLogueado.id) {
      this.router.navigate(['/login']);  
      return;
    }
    this.mostrarFormularioReserva = true;
  }

  abrirFormularioValoracion(): void {
    this.mostrarFormularioValoracion = true;
  }
}

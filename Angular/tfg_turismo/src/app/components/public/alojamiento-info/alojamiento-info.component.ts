import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlojamientoService } from '../../../service/alojamiento.service';
import { ValoracionService } from '../../../service/valoracion.service';
import { ReservaService } from '../../../service/reserva.service';
import { AuthService } from '../../../auth/service/auth.service';
import { Valoracion } from '../../../interfaces/valoracion.model';
import { Alojamiento } from '../../../interfaces/alojamiento.model';

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
  usuarioLogueado: any;

  // Formularios
  mostrarFormularioReserva: boolean = false;
  mostrarFormularioValoracion: boolean = false;
  reserva: any = { fechaInicio: '', fechaFin: '', usuario: null, alojamiento: null };

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
      }
    },
    alojamiento: {
      nombre: '',
      tipo: '',
      ubicacion: '',
      precioNoche: 0,
      servicios: [],
      puntuacion: 0
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
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.alojamientoService.getAlojamientoById(id).subscribe(
        (data) => {
          this.alojamiento = data;
          this.alojamientoSeleccionado = data;

          this.valoracionService.getValoraciones().subscribe(
            (valoraciones) => {
              this.valoraciones = valoraciones;
              this.valoracionesFiltradas = this.valoraciones.filter(
                (valoracion) => valoracion.alojamiento.idAlojamiento === id
              );
            },
            (error) => {
              console.error('Error al obtener las valoraciones:', error);
            }
          );
        },
        (error) => {
          console.error('Error al obtener los detalles del alojamiento:', error);
        }
      );

      this.authService.getUsuarioLogueado().subscribe(
        (usuario) => {
          this.usuarioLogueado = usuario; 
        },
        (error) => {
          console.error('Error al obtener el usuario logueado:', error);
        }
      );
    }
  }

  realizarReserva(): void {
    if (!this.reserva.fechaInicio || !this.reserva.fechaFin || !this.alojamientoSeleccionado || !this.usuarioLogueado) {
      alert("Por favor, complete todos los campos de la reserva.");
      return;
    }

    const reservaData = {
      fechaInicio: this.reserva.fechaInicio,
      fechaFin: this.reserva.fechaFin,
      usuarioId: this.usuarioLogueado.id,
      alojamientoId: this.alojamientoSeleccionado?.idAlojamiento
    };

    this.reservaService.reservarAlojamiento(reservaData).subscribe(
      (response) => {
        console.log('Reserva realizada con éxito', response);
        this.mostrarFormularioReserva = false;
        alert("Reserva realizada con éxito.");
      },
      (error) => {
        console.error('Error al realizar la reserva:', error);
        alert("Hubo un error al realizar la reserva. Intente nuevamente.");
      }
    );
  }

  dejarValoracion(): void {
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
        alert('Valoración registrada correctamente.');
        this.valoracionesFiltradas.push(response);
        this.mostrarFormularioValoracion = false;
      },
      (error) => {
        console.error('Error al enviar la valoración:', error);
        alert('Hubo un error al enviar la valoración. Inténtelo nuevamente.');
      }
    );
  }

  abrirFormularioReserva(): void {
    if (!this.usuarioLogueado) {
      this.router.navigate(['/login']);
      return;
    }
    this.mostrarFormularioReserva = true;
  }

  abrirFormularioValoracion(): void {
    if (!this.usuarioLogueado) {
      this.router.navigate(['/login']); 
      return;
    }
    this.mostrarFormularioValoracion = true;
  }
}

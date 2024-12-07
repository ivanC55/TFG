import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlojamientoService } from '../../../service/alojamiento.service';
import { Alojamiento } from '../../../interfaces/alojamiento.model';
import { Valoracion } from '../../../interfaces/valoracion.model';
import { ValoracionService } from '../../../service/valoracion.service';
import { ReservaService } from '../../../service/reserva.service';
import { UsuarioService } from '../../../service/usuario.service';  

@Component({
  selector: 'app-alojamiento-info',
  templateUrl: './alojamiento-info.component.html',
  styleUrls: ['./alojamiento-info.component.css']
})
export class AlojamientoInfoComponent implements OnInit {
  alojamiento: Alojamiento | null = null;
  valoraciones: Valoracion[] = [];
  valoracionesFiltradas: Valoracion[] = [];
  usuarios: any[] = [];  // Lista de usuarios
  usuarioSeleccionado: any = {};  // Usuario seleccionado
  alojamientoSeleccionado: Alojamiento | null = null;  // Alojamiento seleccionado

  // Formularios
  mostrarFormularioReserva: boolean = false;
  mostrarFormularioValoracion: boolean = false;
  reserva: any = { fechaInicio: '', fechaFin: '', usuario: null, alojamiento: null };  // Información de la reserva
  valoracion: Valoracion = {
    puntuacion: 0, comentario: '', usuario: {
      username: '',
      nombre: '',
      apellidos: '',
      password: '',
      email: '',
      telefono: '',
      direccion: '',
      rol: ''
    }, alojamiento: {
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
    private usuarioService: UsuarioService  
  ) { }

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

      this.usuarioService.getUsuarios().subscribe(
        (usuarios) => {
          this.usuarios = usuarios;
        },
        (error) => {
          console.error('Error al obtener los usuarios:', error);
        }
      );
    }
  }

  realizarReserva(): void {
    if (!this.reserva.fechaInicio || !this.reserva.fechaFin || !this.alojamientoSeleccionado || !this.usuarioSeleccionado) {
      alert("Por favor, complete todos los campos de la reserva.");
      return; 
    }
  
    
    const reservaData = {
      fechaInicio: this.reserva.fechaInicio,
      fechaFin: this.reserva.fechaFin,
      usuarioId: this.usuarioSeleccionado.id, 
      alojamientoId: this.alojamientoSeleccionado?.idAlojamiento, 
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
    const valoracionData = { ...this.valoracion, alojamientoId: this.alojamientoSeleccionado?.idAlojamiento };
    this.valoracionService.dejarValoracion(valoracionData).subscribe(
      (response) => {
        console.log('Valoración enviada con éxito', response);
        this.mostrarFormularioValoracion = false;  
      },
      (error) => {
        console.error('Error al enviar la valoración:', error);
      }
    );
  }
}

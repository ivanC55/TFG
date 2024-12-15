import { Component, OnInit } from '@angular/core';
import { Reserva } from '../../../interfaces/reserva.model';
import { Usuario } from '../../../interfaces/usuario.model';
import { Alojamiento } from '../../../interfaces/alojamiento.model';
import { Restaurante } from '../../../interfaces/restaurante.model';
import { ReservaService } from '../../../service/reserva.service';
import { UsuarioService } from '../../../service/usuario.service';
import { AlojamientoService } from '../../../service/alojamiento.service';
import { RestauranteService } from '../../../service/restaurante.service';
import { forkJoin } from 'rxjs';

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
    this.cargarDatosIniciales();
  }

  inicializarReserva(): Reserva {
    return {
  idReserva: null,
  usuario: null,
  alojamiento: null,
  restaurante: null,
  numPersonas: 1,
  estado: '',
  fechaInicio: '',
  fechaFin: '',
  horaEntrada: '',
  
};
  }

  // Método para cargar todos los datos iniciales (usuarios, alojamientos, restaurantes)
  cargarDatosIniciales(): void {
    forkJoin({
      usuarios: this.usuarioService.getUsuarios(),
      alojamientos: this.alojamientoService.getAlojamientosList(),
      restaurantes: this.restauranteService.getRestaurantes()
    }).subscribe(
      ({ usuarios, alojamientos, restaurantes }) => {
        console.log('Usuarios:', usuarios);
        console.log('Alojamientos:', alojamientos);
        console.log('Restaurantes:', restaurantes);
        
        this.usuarios = usuarios;
        this.alojamientos = alojamientos;
        this.restaurantes = restaurantes;
        this.cargarReservas();
      },
      (error) => {
        console.error('Error al cargar los datos iniciales:', error);
      }
    );
  }  


  cargarReservas(): void {
    this.reservaService.getReservas().subscribe((data) => {
      this.reservas = data.map((reserva) => {
        let usuario = this.usuarios.find(u => u.id === reserva.usuario?.id);
        let alojamiento = this.alojamientos.find(a => a.idAlojamiento === reserva.alojamiento?.idAlojamiento);
        let restaurante = this.restaurantes.find(r => r.idRestaurante === reserva.restaurante?.idRestaurante);
  
        // Agregar logs para depuración
        console.log('Reserva:', reserva.alojamiento);
        console.log('Usuario encontrado:', usuario);
        console.log('Alojamiento encontrado:', alojamiento);
        console.log('Restaurante encontrado:', restaurante);

  
        return {
          ...reserva,
          usuario: usuario || null,
          alojamiento: alojamiento || null,
          restaurante: restaurante || null
        };
      });
    });
  }
  

  mostrarFormulario(): void {
    this.modoFormulario = true;
    this.modoEdicion = false;
    this.reservaSeleccionada = this.inicializarReserva();
  }

  editarReserva(reserva: Reserva): void {
    this.reservaSeleccionada = { ...reserva };
    this.modoEdicion = true;
    this.modoFormulario = true;
    this.usuarioSeleccionadoId = reserva.usuario?.id || null;
    this.alojamientoSeleccionadoId = reserva.alojamiento?.idAlojamiento || null;
    this.restauranteSeleccionadoId = reserva.restaurante?.idRestaurante || null;
  }

  cancelarFormulario(): void {
    this.modoFormulario = false;
    this.modoEdicion = false;
    this.reservaSeleccionada = this.inicializarReserva();
  }

  guardarReserva(): void {
    console.log('usuarioSeleccionadoId:', this.usuarioSeleccionadoId);
    console.log('alojamientoSeleccionadoId:', this.alojamientoSeleccionadoId);
    console.log('restauranteSeleccionadoId:', this.restauranteSeleccionadoId);
  
    // Asegúrate de que los IDs sean números
    const usuarioSeleccionado = this.usuarios.find(u => u.id === Number(this.usuarioSeleccionadoId));
    const alojamientoSeleccionado = this.alojamientos.find(a => a.idAlojamiento === Number(this.alojamientoSeleccionadoId));
    const restauranteSeleccionado = this.restaurantes.find(r => r.idRestaurante === Number(this.restauranteSeleccionadoId));
  
    console.log('Usuario seleccionado:', usuarioSeleccionado);
    console.log('Alojamiento seleccionado:', alojamientoSeleccionado);
    console.log('Restaurante seleccionado:', restauranteSeleccionado);
  
    if (!usuarioSeleccionado || !alojamientoSeleccionado || !restauranteSeleccionado) {
      console.error('No se encontraron los datos para completar la reserva');
      return;  // No continuar si los datos son incorrectos
    }
  
    // Asegúrate de que las referencias a los objetos están correctamente asignadas
    this.reservaSeleccionada.usuario = usuarioSeleccionado;
    this.reservaSeleccionada.alojamiento = alojamientoSeleccionado;
    this.reservaSeleccionada.restaurante = restauranteSeleccionado;
  
    // Verifica que los objetos estén bien asignados antes de enviar
    console.log('Reserva antes de enviar:', this.reservaSeleccionada);
  
    // Aquí asignamos un valor por defecto para el estado (si es necesario)
    if (!this.reservaSeleccionada.estado) {
      this.reservaSeleccionada.estado = 'Pendiente';  // O el valor que desees por defecto
    }
  
    // Enviar al backend
    if (this.modoEdicion) {
      this.reservaService.updateReserva(this.reservaSeleccionada).subscribe(
        (data) => {
          console.log('Reserva actualizada:', data);
          this.modoFormulario = false;
          this.cargarReservas();
        },
        (error) => {
          console.error('Error al actualizar la reserva:', error);
        }
      );
    } else {
      this.reservaService.createReserva(this.reservaSeleccionada).subscribe(
        (data) => {
          console.log('Reserva guardada:', data);
          this.modoFormulario = false;
          this.cargarReservas();
        },
        (error) => {
          console.error('Error al guardar la reserva:', error);
        }
      );
    }
  }
  
    mostrarModalEliminar(reserva: Reserva): void {
    this.reservaParaEliminar = reserva;
  }

  cancelarEliminar(): void {
    this.reservaParaEliminar = null;
  }

  confirmarEliminar(): void {
    if (this.reservaParaEliminar) {
      this.reservaService.deleteReserva(this.reservaParaEliminar.idReserva!).subscribe(
        () => {
          console.log('Reserva eliminada');
          this.cargarReservas();
          this.cancelarEliminar(); 
        },
        (error) => {
          console.error('Error al eliminar la reserva:', error);
        }
      );
    }
  }
}

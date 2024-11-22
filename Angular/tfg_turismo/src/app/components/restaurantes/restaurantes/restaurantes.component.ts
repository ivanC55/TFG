import { Component, OnInit } from '@angular/core';
import { RestauranteService } from '../../../service/restaurante.service';
import { Restaurante } from '../../../interfaces/restaurante.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css']
})
export class RestaurantesComponent implements OnInit {
  restaurantes: Restaurante[] = [];
  restauranteSeleccionado: Restaurante = {
    idRestaurante: 0,
    nombre: '',
    tipoComida: '',
    especialidad: '',
    ubicacion: '',
    precioPromedio: 0,
    horario: '',
    puntuacion: 0
  };
  modoFormulario = false;
  modoEdicion = false; // Controla si el modal de edición está visible
  restauranteParaEliminar: Restaurante | null = null; // Controla el restaurante para eliminar

  constructor(private restauranteService: RestauranteService, private router: Router) { }

  ngOnInit(): void {
    this.cargarRestaurantes();
  }

  cargarRestaurantes(): void {
    this.restauranteService.getRestaurantes().subscribe((data) => {
      this.restaurantes = data;
    });
  }

  mostrarFormulario(restaurante?: Restaurante): void {
    this.restauranteSeleccionado = restaurante
      ? { ...restaurante }
      : {
        idRestaurante: 0,
        nombre: '',
        tipoComida: '',
        especialidad: '',
        ubicacion: '',
        precioPromedio: 0,
        horario: '',
        puntuacion: 0
      };
    this.modoFormulario = true;
    this.modoEdicion = !restaurante ? false : true; // Si no es nuevo, es edición
  }

  guardarRestaurante(): void {
    // Validaciones
    if (!this.restauranteSeleccionado.nombre || !this.restauranteSeleccionado.tipoComida || !this.restauranteSeleccionado.especialidad || !this.restauranteSeleccionado.ubicacion || this.restauranteSeleccionado.precioPromedio <= 0) {
      alert('Todos los campos son obligatorios y el precio debe ser mayor a 0');
      return;
    }

    if (this.restauranteSeleccionado.idRestaurante) {
      this.restauranteService.updateRestaurante(this.restauranteSeleccionado.idRestaurante, this.restauranteSeleccionado).subscribe(() => {
        this.modoFormulario = false;
        this.cargarRestaurantes();
      });
    } else {
      this.restauranteService.createRestaurante(this.restauranteSeleccionado).subscribe(() => {
        this.modoFormulario = false;
        this.cargarRestaurantes();
      });
    }
  }

  eliminarRestaurante(id: number): void {
    if (confirm('¿Estás seguro de eliminar este restaurante?')) {
      this.restauranteService.deleteRestaurante(id).subscribe(() => {
        this.cargarRestaurantes();
      });
    }
  }

  mostrarModalEliminar(restaurante: Restaurante): void {
    this.restauranteParaEliminar = restaurante; // Seleccionar el restaurante para eliminar
  }

  cancelarEliminar(): void {
    this.restauranteParaEliminar = null; // Cerrar el modal de eliminación sin hacer nada
  }

  confirmarEliminar(): void {
    if (this.restauranteParaEliminar && this.restauranteParaEliminar.idRestaurante != null) {
      // Eliminar el restaurante
      this.restauranteService.deleteRestaurante(this.restauranteParaEliminar.idRestaurante).subscribe(() => {
        this.restauranteParaEliminar = null; // Cerrar el modal de eliminación
        this.cargarRestaurantes(); // Actualizar la lista de restaurantes
      });
    } else {
      alert('Error: no se puede eliminar este restaurante.');
    }
  }
  cancelarFormulario(): void {
    this.restauranteSeleccionado = {
      idRestaurante: 0,
      nombre: '',
      tipoComida: '',
      especialidad: '',
      ubicacion: '',
      precioPromedio: 0,
      horario: '',
      puntuacion: 0
    };
    this.modoFormulario = false;
  }
}

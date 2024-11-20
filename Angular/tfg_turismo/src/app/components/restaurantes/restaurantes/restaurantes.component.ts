import { Component, OnInit } from '@angular/core';
import { RestauranteService } from '../../../service/restaurante.service';
import { Restaurante } from '../../../interfaces/restaurante.model';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css']
})
export class RestaurantesComponent implements OnInit {
  restaurantes: Restaurante[] = [];
  // Inicializamos restauranteSeleccionado con valores predeterminados.
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

  constructor(private restauranteService: RestauranteService) { }

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
  }

  guardarRestaurante(): void {
    if (!this.restauranteSeleccionado) return;

    if (this.restauranteSeleccionado.idRestaurante) {
      this.restauranteService
        .updateRestaurante(this.restauranteSeleccionado.idRestaurante, this.restauranteSeleccionado)
        .subscribe(() => {
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
    if (confirm('¿Deseas eliminar este restaurante?')) {
      this.restauranteService.deleteRestaurante(id).subscribe(() => {
        this.cargarRestaurantes();
      });
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

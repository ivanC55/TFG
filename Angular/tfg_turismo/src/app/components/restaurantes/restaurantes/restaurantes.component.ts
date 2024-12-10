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
    idRestaurante: undefined,  // Cambié a undefined en vez de 0
    nombre: '',
    tipoComida: '',
    especialidad: '',
    ubicacion: '',
    precioPromedio: 0,
    horario: '',
    puntuacion: 0,
    imagen: ''
  };
  modoFormulario = false;
  modoEdicion = false;
  restauranteParaEliminar: Restaurante | null = null;

  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

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
          idRestaurante: undefined,  // Aseguramos que idRestaurante sea undefined para un restaurante nuevo
          nombre: '',
          tipoComida: '',
          especialidad: '',
          ubicacion: '',
          precioPromedio: 0,
          horario: '',
          puntuacion: 0,
          imagen: ''
      };
    this.modoFormulario = true;
    this.modoEdicion = !!restaurante; // Si no es nuevo, es edición
  }

  guardarRestaurante(): void {
    // Validaciones
    if (!this.restauranteSeleccionado.nombre || !this.restauranteSeleccionado.tipoComida || !this.restauranteSeleccionado.especialidad || !this.restauranteSeleccionado.ubicacion || this.restauranteSeleccionado.precioPromedio <= 0) {
      alert('Todos los campos son obligatorios y el precio debe ser mayor a 0');
      return;
    }

    if (this.restauranteSeleccionado.idRestaurante !== undefined) {
      // Si idRestaurante no es undefined, lo usamos para actualizar
      this.restauranteService.updateRestaurante(this.restauranteSeleccionado.idRestaurante, this.restauranteSeleccionado).subscribe(() => {
        if (this.selectedFile) {
          this.subirImagen(this.restauranteSeleccionado.idRestaurante!); // idRestaurante ahora es un número seguro
        } else {
          this.finalizarGuardado();
        }
      });
    } else {
      // Si no tiene idRestaurante, se crea un nuevo restaurante
      this.restauranteService.createRestaurante(this.restauranteSeleccionado).subscribe((nuevoRestaurante) => {
        if (this.selectedFile) {
          this.subirImagen(nuevoRestaurante.idRestaurante!); // Asegúrate de que idRestaurante no es undefined
        } else {
          this.finalizarGuardado();
        }
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
    this.restauranteParaEliminar = restaurante;
  }

  cancelarEliminar(): void {
    this.restauranteParaEliminar = null;
  }

  confirmarEliminar(): void {
    if (this.restauranteParaEliminar && this.restauranteParaEliminar.idRestaurante != null) {
      this.restauranteService.deleteRestaurante(this.restauranteParaEliminar.idRestaurante).subscribe(() => {
        this.restauranteParaEliminar = null;
        this.cargarRestaurantes();
      });
    } else {
      alert('Error: no se puede eliminar este restaurante.');
    }
  }

  cancelarFormulario(): void {
    this.restauranteSeleccionado = {
      idRestaurante: undefined,  // Cambié de 0 a undefined
      nombre: '',
      tipoComida: '',
      especialidad: '',
      ubicacion: '',
      precioPromedio: 0,
      horario: '',
      puntuacion: 0,
      imagen: ''
    };
    this.modoFormulario = false;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.selectedFile = file;

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  private subirImagen(id: number): void {
    if (this.selectedFile) {
      this.restauranteService.uploadImage(id, this.selectedFile).subscribe(
        () => this.finalizarGuardado(),
        (error) => {
          console.error('Error al subir la imagen:', error);
          alert('Hubo un error al subir la imagen.');
        }
      );
    }
  }

  private finalizarGuardado(): void {
    this.modoFormulario = false;
    this.cargarRestaurantes();
  }
}

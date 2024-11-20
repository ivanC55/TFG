import { Component, OnInit } from '@angular/core';
import { Alojamiento } from '../../interfaces/alojamiento.model';
import { AlojamientoService } from '../../service/alojamiento.service';

@Component({
  selector: 'app-alojamientos',
  templateUrl: './alojamientos.component.html',
  styleUrls: ['./alojamientos.component.css']
})
export class AlojamientosComponent implements OnInit {
  alojamientos: Alojamiento[] = [];
  showAddForm: boolean = false;
  isEditing: boolean = false;

  // Modelo para el nuevo alojamiento
  alojamiento: Alojamiento = {
    idAlojamiento: 0, // o puedes omitirlo si no se requiere al crearlo
    nombre: '',
    tipo: '',
    ubicacion: '',
    precioNoche: 0,
    servicios: '',
    puntuacion: 0,
  };

  constructor(private alojamientoService: AlojamientoService) {}

  ngOnInit(): void {
    this.listAlojamientos();
  }

  // Obtener la lista de alojamientos
  listAlojamientos() {
    this.alojamientoService.getAlojamientosList().subscribe(
      (data) => {
        this.alojamientos = data;
        console.log(this.alojamientos);
      },
      (error) => {
        console.error('Error fetching alojamientos:', error);
      }
    );
  }

  // Mostrar u ocultar el formulario de creación
  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  // Añadir o actualizar un alojamiento
  addAlojamiento() {
    if (this.isEditing) {
      // Actualizar alojamiento
      this.alojamientoService.updateAlojamiento(this.alojamiento).subscribe(
        (response) => {
          console.log('Alojamiento actualizado:', response);
          alert('¡Alojamiento actualizado exitosamente!');
          this.resetForm();
          this.showAddForm = false; // Cerrar el formulario
          this.listAlojamientos(); // Actualizar lista
        },
        (error) => {
          console.error('Error al actualizar el alojamiento:', error);
          alert('Hubo un error al actualizar el alojamiento.');
        }
      );
    } else {
      // Crear nuevo alojamiento
      this.alojamientoService.createAlojamiento(this.alojamiento).subscribe(
        (response) => {
          console.log('Alojamiento añadido:', response);
          alert('¡Alojamiento añadido exitosamente!');
          this.resetForm();
          this.showAddForm = false; // Cerrar el formulario
          this.listAlojamientos(); // Actualizar lista
        },
        (error) => {
          console.error('Error al añadir el alojamiento:', error);
          alert('Hubo un error al añadir el alojamiento.');
        }
      );
    }
  }

    // Preparar alojamiento para edición
    editAlojamiento(alojamiento: Alojamiento) {
      this.alojamiento = { ...alojamiento };
      this.showAddForm = true;
      this.isEditing = true;
    }

      // Eliminar alojamiento
  deleteAlojamiento(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este alojamiento?')) {
      this.alojamientoService.deleteAlojamiento(id).subscribe(
        () => {
          console.log('Alojamiento eliminado');
          alert('Alojamiento eliminado exitosamente');
          this.listAlojamientos(); // Actualizar lista
        },
        (error) => {
          console.error('Error al eliminar el alojamiento:', error);
          alert('Hubo un error al eliminar el alojamiento.');
        }
      );
    }
  }
  

  // Reiniciar el formulario
  resetForm() {
    this.alojamiento = {
      idAlojamiento: 0,
      nombre: '',
      tipo: '',
      ubicacion: '',
      precioNoche: 0,
      servicios: '',
      puntuacion: 0,
    };
  }
}

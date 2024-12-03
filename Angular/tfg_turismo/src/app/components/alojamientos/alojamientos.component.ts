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
  alojamiento: Alojamiento = {
    idAlojamiento: 0,
    nombre: '',
    tipo: '',
    ubicacion: '',
    precioNoche: 0,
    servicios: [],
    puntuacion: 0,
  };

  mostrarModalFormulario: boolean = false; // Controla la visibilidad del modal
  mostrarModalEliminar: boolean = false; // Controla la visibilidad del modal de eliminar
  isEditing: boolean = false; // Define si se está editando o creando un alojamiento

  puntuacionInvalida: boolean = false;

  constructor(private alojamientoService: AlojamientoService) { }

  ngOnInit(): void {
    this.listAlojamientos();
  }

  validarPuntuacion(): void {
    if (this.alojamiento.puntuacion < 0 || this.alojamiento.puntuacion > 5) {
      this.puntuacionInvalida = true;
    } else {
      this.puntuacionInvalida = false;
    }
  }
  // Obtener la lista de alojamientos
  listAlojamientos() {
    this.alojamientoService.getAlojamientosList().subscribe(
      (data) => {
        this.alojamientos = data;
      },
      (error) => {
        console.error('Error fetching alojamientos:', error);
      }
    );
  }

  // Mostrar el formulario en el modal para agregar o editar alojamiento
  mostrarFormulario(alojamiento?: Alojamiento): void {
    this.alojamiento = alojamiento
      ? { ...alojamiento }
      : {
        idAlojamiento: 0,
        nombre: '',
        tipo: '',
        ubicacion: '',
        precioNoche: 0,
        servicios: [],
        puntuacion: 0,
      };
    this.isEditing = !!alojamiento;
    this.mostrarModalFormulario = true;
  }

  // Guardar un alojamiento nuevo o editar uno existente
  guardarAlojamiento(): void {
    if (this.isEditing) {
        // Actualizar alojamiento
        this.alojamientoService.updateAlojamiento(this.alojamiento).subscribe(
            () => {
                alert('¡Alojamiento actualizado exitosamente!');
                this.cerrarModalFormulario();
                this.listAlojamientos(); // Actualizar la lista de alojamientos
            },
            (error) => {
                console.error('Error al actualizar el alojamiento:', error);
                alert('Hubo un error al actualizar el alojamiento.');
            }
        );
    } else {
        // Crear alojamiento nuevo
        this.alojamientoService.createAlojamiento(this.alojamiento).subscribe(
            () => {
                alert('¡Alojamiento añadido exitosamente!');
                this.cerrarModalFormulario();
                this.listAlojamientos(); // Actualizar la lista de alojamientos
            },
            (error) => {
                console.error('Error al añadir el alojamiento:', error);
                alert('Hubo un error al añadir el alojamiento.');
            }
        );
    }
}

  // Eliminar alojamiento
  eliminarAlojamiento(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este alojamiento?')) {
      this.alojamientoService.deleteAlojamiento(id).subscribe(
        () => {
          alert('Alojamiento eliminado exitosamente');
          this.listAlojamientos(); // Actualizar la lista
        },
        (error) => {
          console.error('Error al eliminar el alojamiento:', error);
          alert('Hubo un error al eliminar el alojamiento.');
        }
      );
    }
  }

  // Abrir el modal de confirmación para eliminar alojamiento
  abrirModalEliminar(alojamiento: Alojamiento): void {
    this.alojamiento = { ...alojamiento };
    this.mostrarModalEliminar = true;
  }

  // Cerrar modal de eliminar
  cancelarEliminar(): void {
    this.mostrarModalEliminar = false;
  }

  // Confirmar eliminación
  confirmarEliminar(): void {
    if (this.alojamiento && this.alojamiento.idAlojamiento !== undefined) {
      this.eliminarAlojamiento(this.alojamiento.idAlojamiento);
      this.mostrarModalEliminar = false;
    }
  }

  // Cerrar formulario de modal
  cerrarModalFormulario(): void {
    this.mostrarModalFormulario = false;
  }

  // Función para agregar los servicios seleccionados
  agregarServicioSeleccionado(): void {
    const serviciosSeleccionados = Array.from((<HTMLSelectElement>document.getElementById('servicios')).selectedOptions)
        .map(option => option.value);

    // Asegurarnos de que los servicios seleccionados no se dupliquen
    serviciosSeleccionados.forEach(servicio => {
        if (!this.alojamiento.servicios.includes(servicio)) {
            this.alojamiento.servicios.push(servicio);
        }
    });
}

  // Función para eliminar un servicio de la lista
  eliminarServicio(servicio: string): void {
    const index = this.alojamiento.servicios.indexOf(servicio);
    if (index > -1) {
        this.alojamiento.servicios.splice(index, 1); // Eliminar servicio de la lista
    }
}
}



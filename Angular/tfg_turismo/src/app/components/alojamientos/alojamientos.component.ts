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
    idAlojamiento: undefined,
    nombre: '',
    tipo: '',
    ubicacion: '',
    precioNoche: 0,
    servicios: [],
    puntuacion: 0,
    imagen: ''
  };

  mostrarModalFormulario: boolean = false;
  mostrarModalEliminar: boolean = false;
  isEditing: boolean = false;

  puntuacionInvalida: boolean = false;

  // Subida de imagen
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private alojamientoService: AlojamientoService) { }

  ngOnInit(): void {
    this.listAlojamientos();
  }

  validarPuntuacion(): void {
    this.puntuacionInvalida = this.alojamiento.puntuacion < 0 || this.alojamiento.puntuacion > 5;
  }

  listAlojamientos(): void {
    this.alojamientoService.getAlojamientosList().subscribe(
      (data) => {
        this.alojamientos = data;
      },
      (error) => {
        console.error('Error fetching alojamientos:', error);
      }
    );
  }

  mostrarFormulario(alojamiento?: Alojamiento): void {
    this.alojamiento = alojamiento
      ? { ...alojamiento }
      : {
        idAlojamiento: undefined,
        nombre: '',
        tipo: '',
        ubicacion: '',
        precioNoche: 0,
        servicios: [],
        puntuacion: 0,
        imagen: ''
      };
    this.isEditing = !!alojamiento;
    this.mostrarModalFormulario = true;
    this.selectedFile = null;
    this.previewUrl = null;
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

  guardarAlojamiento(): void {
    if (this.isEditing) {
      if (this.alojamiento.idAlojamiento !== undefined) {
        this.alojamientoService.updateAlojamiento(this.alojamiento).subscribe(
          () => {
            if (this.selectedFile) {
              this.subirImagen(this.alojamiento.idAlojamiento!);
            } else {
              this.finalizarGuardado();
            }
          },
          (error) => {
            console.error('Error al actualizar el alojamiento:', error);
            alert('Hubo un error al actualizar el alojamiento.');
          }
        );
      } else {
        console.error('No se puede actualizar un alojamiento sin id.');
      }
    } else {
      this.alojamientoService.createAlojamiento(this.alojamiento).subscribe(
        (nuevoAlojamiento) => {
          if (this.selectedFile) {
            this.subirImagen(nuevoAlojamiento.idAlojamiento!);
          } else {
            this.finalizarGuardado();
          }
        },
        (error) => {
          console.error('Error al añadir el alojamiento:', error);
          alert('Hubo un error al añadir el alojamiento.');
        }
      );
    }
  }
  

  private subirImagen(id: number): void {
    if (this.selectedFile) {
      this.alojamientoService.uploadImage(id, this.selectedFile).subscribe(
        () => this.finalizarGuardado(),
        (error) => {
          console.error('Error al subir la imagen:', error);
          alert('Hubo un error al subir la imagen.');
        }
      );
    }
  }

  private finalizarGuardado(): void {
    alert('Alojamiento guardado exitosamente.');
    this.mostrarModalFormulario = false;
    this.listAlojamientos();
    this.selectedFile = null;
    this.previewUrl = null;
  }

  abrirModalEliminar(alojamiento: Alojamiento): void {
    this.alojamiento = { ...alojamiento };
    this.mostrarModalEliminar = true;
  }

  cancelarEliminar(): void {
    this.mostrarModalEliminar = false;
  }

  confirmarEliminar(): void {
    if (this.alojamiento.idAlojamiento !== undefined) {
      this.eliminarAlojamiento(this.alojamiento.idAlojamiento);
      this.mostrarModalEliminar = false;
    } else {
      console.error('El idAlojamiento no está definido. No se puede eliminar.');
    }
  }

  eliminarAlojamiento(id: number): void {
    this.alojamientoService.deleteAlojamiento(id).subscribe(
      () => {
        alert('Alojamiento eliminado exitosamente.');
        this.listAlojamientos();
      },
      (error) => {
        console.error('Error al eliminar el alojamiento:', error);
        alert('Hubo un error al eliminar el alojamiento.');
      }
    );
  }

  cerrarModalFormulario(): void {
    this.mostrarModalFormulario = false;
  }
}

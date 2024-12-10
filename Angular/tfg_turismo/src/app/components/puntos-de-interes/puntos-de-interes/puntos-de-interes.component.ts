import { Component, OnInit } from '@angular/core';
import { PuntoDeInteresService } from '../../../service/punto-de-interes.service';
import { PuntoDeInteres } from '../../../interfaces/punto-de-interes.model'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-puntos-de-interes',
  templateUrl: './puntos-de-interes.component.html',
  styleUrls: ['./puntos-de-interes.component.css'],
})
export class PuntosDeInteresComponent implements OnInit {
  puntos: PuntoDeInteres[] = [];
  puntoSeleccionado: PuntoDeInteres = {
    idPunto: undefined,
    nombre: '',
    descripcion: '',
    ubicacion: '',
    imagen: ''
  };
  modoFormulario = false;
  modoEdicion = false;
  puntoParaEliminar: PuntoDeInteres | null = null;

  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private puntoService: PuntoDeInteresService, private router: Router) { }

  ngOnInit(): void {
    this.cargarPuntos();
  }

  cargarPuntos(): void {
    this.puntoService.getPuntosDeInteres().subscribe((data) => {
      this.puntos = data;
    });
  }

  mostrarFormulario(punto?: PuntoDeInteres): void {
    this.puntoSeleccionado = punto
      ? { ...punto }
      : {
          idPunto: undefined,  
          nombre: '',
          descripcion: '',
          ubicacion: '',
          imagen: ''
      };
    this.modoFormulario = true;
    this.modoEdicion = !!punto; 
  }

  guardarPunto(): void {
    // Validaciones
    if (!this.puntoSeleccionado.nombre || !this.puntoSeleccionado.descripcion || !this.puntoSeleccionado.ubicacion) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (this.puntoSeleccionado.idPunto !== undefined) {
      // Actualizar punto de interés existente
      this.puntoService.updatePuntoDeInteres(this.puntoSeleccionado.idPunto, this.puntoSeleccionado).subscribe(() => {
        if (this.selectedFile) {
          this.subirImagen(this.puntoSeleccionado.idPunto!); // Subir imagen si se ha seleccionado
        } else {
          this.finalizarGuardado();
        }
      });
    } else {
      // Crear un nuevo punto de interés
      this.puntoService.createPuntoDeInteres(this.puntoSeleccionado).subscribe((nuevoPunto) => {
        if (this.selectedFile) {
          this.subirImagen(nuevoPunto.idPunto!); // Subir imagen si se ha seleccionado
        } else {
          this.finalizarGuardado();
        }
      });
    }
  }

  eliminarPunto(id: number): void {
    if (confirm('¿Estás seguro de eliminar este punto de interés?')) {
      this.puntoService.deletePuntoDeInteres(id).subscribe(() => {
        this.cargarPuntos();
      });
    }
  }

  mostrarModalEliminar(punto: PuntoDeInteres): void {
    this.puntoParaEliminar = punto;
  }

  cancelarEliminar(): void {
    this.puntoParaEliminar = null;
  }

  confirmarEliminar(): void {
    if (this.puntoParaEliminar && this.puntoParaEliminar.idPunto != null) {
      this.puntoService.deletePuntoDeInteres(this.puntoParaEliminar.idPunto).subscribe(() => {
        this.puntoParaEliminar = null;
        this.cargarPuntos();
      });
    } else {
      alert('Error: no se puede eliminar este punto de interés.');
    }
  }

  cancelarFormulario(): void {
    this.puntoSeleccionado = {
      idPunto: undefined,  
      nombre: '',
      descripcion: '',
      ubicacion: '',
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
      this.puntoService.uploadImage(id, this.selectedFile).subscribe(
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
    this.cargarPuntos();
  }
}

import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../../service/evento.service';
import { Evento } from '../../../interfaces/evento.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosComponent implements OnInit {
  eventos: Evento[] = [];
  eventoSeleccionado: Evento = {
    idEvento: 0,
    nombre: '',
    descripcion: '',
    fecha_inicio: new Date(),
    fecha_fin: new Date(),
    ubicacion: '',
    precio_entrada: 0,
    imagen: '',
  };
  modoFormulario = false;
  modoEdicion = false; // Controla si el modal de edición está visible
  eventoParaEliminar: Evento | null = null;

  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private eventoService: EventoService, private router: Router) { }

  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos(): void {
    this.eventoService.getEventos().subscribe((data) => (this.eventos = data));
  }

  verDetalles(id: number): void {
    this.router.navigate(['/eventos', id]);
  }

  mostrarFormulario(): void {
    this.modoEdicion = true;
    this.eventoSeleccionado = {
      idEvento: 0,
      nombre: '',
      descripcion: '',
      fecha_inicio: new Date(),
      fecha_fin: new Date(),
      ubicacion: '',
      precio_entrada: 0,
      imagen: '',
    };
    this.modoFormulario = true;
  }

  editarEvento(evento: Evento): void {
    // Pre-cargar los datos del evento en el modal de edición
    this.eventoSeleccionado = { ...evento };
    this.modoEdicion = true; // Mostrar el modal de edición
  }

  cancelarEdicion(): void {
    this.modoEdicion = false; // Cerrar el modal de edición
  }

  guardarEvento(): void {
    // Validación de campos obligatorios
    if (!this.eventoSeleccionado.nombre || !this.eventoSeleccionado.descripcion || !this.eventoSeleccionado.ubicacion) {
      alert('Todos los campos son obligatorios');
      return;
    }

    // Validación de fechas
    if (this.eventoSeleccionado.fecha_inicio > this.eventoSeleccionado.fecha_fin) {
      alert('La fecha de inicio no puede ser posterior a la fecha de fin');
      return;
    }

    // Si el evento tiene un id (está siendo editado), lo actualizamos
    if (this.eventoSeleccionado.idEvento && this.eventoSeleccionado.idEvento !== 0) {
      // Está siendo editado, usamos PUT
      this.eventoService.updateEvento(this.eventoSeleccionado.idEvento, this.eventoSeleccionado).subscribe(() => {
        this.finalizarGuardado();
      });
    } else {
      // Es un nuevo evento, usamos POST
      this.eventoService.createEvento(this.eventoSeleccionado).subscribe((nuevoEvento) => {
        if (this.selectedFile) {
          this.subirImagen(nuevoEvento.idEvento!);
        } else {
          this.finalizarGuardado();
        }
      });
    }
}



  mostrarModalEliminar(evento: Evento): void {
    this.eventoParaEliminar = evento; // Seleccionar el evento para eliminar
  }

  cancelarEliminar(): void {
    this.eventoParaEliminar = null; // Cerrar el modal de eliminación sin hacer nada
  }

  confirmarEliminar(): void {
    if (this.eventoParaEliminar) {
      this.eventoService.deleteEvento(this.eventoParaEliminar.idEvento).subscribe(() => {
        this.eventoParaEliminar = null; // Cerrar el modal de eliminación
        this.cargarEventos(); // Actualizar la lista de eventos
      });
    }
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
      this.eventoService.uploadImage(id, this.selectedFile).subscribe(
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
    this.cargarEventos();
  }
}

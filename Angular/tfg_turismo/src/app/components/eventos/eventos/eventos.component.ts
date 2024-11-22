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
  };
  modoFormulario = false;
  modoEdicion = false; // Controla si el modal de edición está visible
  eventoParaEliminar: Evento | null = null;

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

  guardarEvento(evento: Evento): void {
    if (!evento.nombre || !evento.descripcion || !evento.ubicacion || !evento.precio_entrada) {
      alert('Todos los campos son obligatorios');
      return;
    }
    if (evento.fecha_inicio > evento.fecha_fin) {
      alert('La fecha de inicio no puede ser posterior a la fecha de fin');
      return;
    }

    // Si las validaciones pasan, guardamos el evento
    if (evento.idEvento) {
      this.eventoService.updateEvento(evento.idEvento, evento).subscribe(() => {
        this.modoEdicion = false;
        this.cargarEventos();
      });
    } else {
      this.eventoService.createEvento(evento).subscribe(() => {
        this.modoEdicion = false;
        this.cargarEventos();
      });
    }

    console.log("Evento guardado:", evento);
        this.modoEdicion = false;
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
}

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
   // Para detalles o edición
  modoFormulario = false; // Toggle para mostrar formulario de creación/edición

  constructor(private eventoService: EventoService, private router: Router) { }

  ngOnInit(): void {
    this.cargarEventos();
  }

  // Cargar todos los eventos
  cargarEventos(): void {
    this.eventoService.getEventos().subscribe((data) => {
      this.eventos = data;
    });
  }

  // Redirigir a la página de detalles del evento
  verDetalles(id: number): void {
    this.router.navigate(['/eventos', id]);
  }

  // Mostrar el formulario para crear o editar un evento
  mostrarFormulario(evento?: Evento): void {
    this.eventoSeleccionado = evento ? { ...evento } : {
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

  // Guardar un nuevo evento o actualizar uno existente
  guardarEvento(evento?: Evento): void {
    if (!evento) {
      return;
    }

    if (evento.idEvento) {
      this.eventoService.updateEvento(evento.idEvento, evento).subscribe(() => {
        this.modoFormulario = false;
        this.cargarEventos();
      });
    } else {
      this.eventoService.createEvento(evento).subscribe(() => {
        this.modoFormulario = false;
        this.cargarEventos();
      });
    }
  }

  // Eliminar un evento
  eliminarEvento(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      this.eventoService.deleteEvento(id).subscribe(() => {
        this.cargarEventos(); // Recargar lista
      });
    }
  }

  // Cancelar la acción de creación/edición
  cancelarFormulario(): void {
    this.eventoSeleccionado = {
      idEvento: 0,
      nombre: '',
      descripcion: '',
      fecha_inicio: new Date(),
      fecha_fin: new Date(),
      ubicacion: '',
      precio_entrada: 0,
    };
    this.modoFormulario = false;
  }
}

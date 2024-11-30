import { Component } from '@angular/core';
import { EventoService } from '../../../service/evento.service';
import { Evento } from '../../../interfaces/evento.model';

@Component({
  selector: 'app-eventos-public',
  templateUrl: './eventos-public.component.html',
  styleUrl: './eventos-public.component.css'
})
export class EventosPublicComponent {

  eventos: Evento[] = [];  // Arreglo para almacenar los eventos
  puntuacionMedia: string = 'N/A';  // Puntuación media inicializada como 'N/A'

  constructor(private eventoService: EventoService) { }

  ngOnInit(): void {
    // Llamada al servicio para obtener la lista de eventos
    this.eventoService.getEventos().subscribe({
      next: (data) => {
        this.eventos = data;  // Asignar los eventos a la variable
      },
      error: (error) => {
        console.error('Error al obtener eventos', error);
      }
    });
  }
}

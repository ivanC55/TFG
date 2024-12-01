import { Component } from '@angular/core';
import { Evento } from '../../../interfaces/evento.model';
import { EventoService } from '../../../service/evento.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eventos-public-info',
  templateUrl: './eventos-public-info.component.html',
  styleUrl: './eventos-public-info.component.css'
})
export class EventosPublicInfoComponent {
  evento!: Evento; 
  error: string | null = null; 

  constructor(
    private eventoService: EventoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (isNaN(id)) {
      this.error = 'ID de evento inválido.';
      return;
    }

    
    this.eventoService.getEventoById(id).subscribe({
      next: (data: Evento) => {
        this.evento = data;
      },
      error: (err) => {
        this.error = 'No se pudo cargar el evento.';
        console.error(err);
      }
    });
  }
}

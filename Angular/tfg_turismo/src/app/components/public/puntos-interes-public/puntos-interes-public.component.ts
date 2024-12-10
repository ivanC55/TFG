import { Component, OnInit } from '@angular/core';
import { PuntoDeInteres } from '../../../interfaces/punto-de-interes.model'; // Asegúrate de que el modelo esté correcto
import { PuntoDeInteresService } from '../../../service/punto-de-interes.service'; // Servicio para obtener los puntos de interés

@Component({
  selector: 'app-puntos-interes-public',
  templateUrl: './puntos-interes-public.component.html',
  styleUrls: ['./puntos-interes-public.component.css']
})
export class PuntosInteresPublicComponent implements OnInit {

  puntosDeInteres: PuntoDeInteres[] = []; // Lista de puntos de interés

  constructor(private puntoDeInteresService: PuntoDeInteresService) { }

  ngOnInit(): void {
    // Obtener la lista de puntos de interés
    this.puntoDeInteresService.getPuntosDeInteres().subscribe({
      next: (data) => {
        this.puntosDeInteres = data; 
      },
      error: (error) => {
        console.error('Error al obtener puntos de interés', error);
      }
    });
  }

}

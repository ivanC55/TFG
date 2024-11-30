import { Component, OnInit } from '@angular/core';
import { PuntoDeInteres } from '../../../interfaces/punto-de-interes.model';
import { PuntoDeInteresService } from '../../../service/punto-de-interes.service';

@Component({
  selector: 'app-puntos-interes-public',
  templateUrl: './puntos-interes-public.component.html',
  styleUrls: ['./puntos-interes-public.component.css']
})
export class PuntosDeInteresPublicComponent implements OnInit {

  puntosDeInteres: PuntoDeInteres[] = [];  // Arreglo para almacenar los puntos de interés

  constructor(private puntoDeInteresService: PuntoDeInteresService) { }

  ngOnInit(): void {
    // Llamada al servicio para obtener la lista de puntos de interés
    this.puntoDeInteresService.getPuntosDeInteres().subscribe({
      next: (data) => {
        this.puntosDeInteres = data;  // Asignar los puntos de interés a la variable
      },
      error: (error) => {
        console.error('Error al obtener puntos de interés', error);
      }
    });
  }
}

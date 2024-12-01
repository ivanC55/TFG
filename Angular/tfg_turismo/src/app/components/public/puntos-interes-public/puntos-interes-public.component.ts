import { Component, OnInit } from '@angular/core';
import { PuntoDeInteres } from '../../../interfaces/punto-de-interes.model';
import { PuntoDeInteresService } from '../../../service/punto-de-interes.service';

@Component({
  selector: 'app-puntos-interes-public',
  templateUrl: './puntos-interes-public.component.html',
  styleUrls: ['./puntos-interes-public.component.css']
})
export class PuntosInteresPublicComponent implements OnInit {

  puntosDeInteres: PuntoDeInteres[] = []; // Lista de puntos de interés
  puntosConRuta: number = 0; // Contador de puntos con ruta asociada

  constructor(private puntoDeInteresService: PuntoDeInteresService) { }

  ngOnInit(): void {
    // Obtener la lista de puntos de interés
    this.puntoDeInteresService.getPuntosDeInteres().subscribe({
      next: (data) => {
        this.puntosDeInteres = data; // Asignar los puntos de interés
        this.calcularPuntosConRuta(); // Calcular puntos con ruta
      },
      error: (error) => {
        console.error('Error al obtener puntos de interés', error);
      }
    });
  }

  // Calcular cuántos puntos tienen ruta asociada
  calcularPuntosConRuta(): void {
    this.puntosConRuta = this.puntosDeInteres.filter(punto => punto.ruta !== null).length;
  }
}

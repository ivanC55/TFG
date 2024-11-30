import { Component, OnInit } from '@angular/core';
import { Alojamiento } from '../../../interfaces/alojamiento.model';
import { AlojamientoService } from '../../../service/alojamiento.service';

@Component({
  selector: 'app-alojamientos-public',
  templateUrl: './alojamientos-public.component.html',
  styleUrls: ['./alojamientos-public.component.css'] // Nota: corregí el nombre de la propiedad 'styleUrls'
})
export class AlojamientosPublicComponent implements OnInit {
  
  alojamientos: Alojamiento[] = [];  // Arreglo para almacenar los alojamientos
  puntuacionMedia: string = 'N/A';  // Puntuación media inicializada como 'N/A'

  constructor(private alojamientoService: AlojamientoService) { }

  ngOnInit(): void {
    // Llamada al servicio para obtener la lista de alojamientos
    this.alojamientoService.getAlojamientosList().subscribe({
      next: (data) => {
        this.alojamientos = data;  // Asignar los alojamientos a la variable
        this.calcularPuntuacionMedia(); // Calcula la puntuación media
      },
      error: (error) => {
        console.error('Error al obtener alojamientos', error);
      }
    });
  }

  calcularPuntuacionMedia(): void {
    if (this.alojamientos.length > 0) {
      const sumaPuntuaciones = this.alojamientos.reduce((acc, alojamiento) => acc + alojamiento.puntuacion, 0);
      this.puntuacionMedia = (sumaPuntuaciones / this.alojamientos.length).toFixed(1); 
    }
  }
}

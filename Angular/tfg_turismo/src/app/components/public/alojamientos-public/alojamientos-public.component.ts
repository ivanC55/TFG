import { Component, OnInit } from '@angular/core';
import { Alojamiento } from '../../../interfaces/alojamiento.model';
import { AlojamientoService } from '../../../service/alojamiento.service';
import { Valoracion } from '../../../interfaces/valoracion.model'; 
import { ValoracionService } from '../../../service/valoracion.service'; 

@Component({
  selector: 'app-alojamientos-public',
  templateUrl: './alojamientos-public.component.html',
  styleUrls: ['./alojamientos-public.component.css']
})
export class AlojamientosPublicComponent implements OnInit {
  
  alojamientos: Alojamiento[] = [];  
  puntuacionMedia: string = 'N/A';  
  valoraciones: Valoracion[] = [];  
  currentValoracionTranslate: number = 0; 
  currentValoracionIndex: number = 0;  
  valoracionesPorPagina: number = 3; 
  
  constructor(
    private alojamientoService: AlojamientoService,
    private valoracionService: ValoracionService
  ) { }

  ngOnInit(): void {
    this.alojamientoService.getAlojamientosList().subscribe({
      next: (data) => {
        this.alojamientos = data;  
        this.calcularPuntuacionMedia(); 
      },
      error: (error) => {
        console.error('Error al obtener alojamientos', error);
      }
    });

    // Llamada al servicio de valoraciones
    this.valoracionService.getValoraciones().subscribe({
      next: (data) => {
        this.valoraciones = data; 
      },
      error: (error) => {
        console.error('Error al obtener valoraciones', error);
      }
    });
  }

  calcularPuntuacionMedia(): void {
    if (this.alojamientos.length > 0) {
      const sumaPuntuaciones = this.alojamientos.reduce((acc, alojamiento) => acc + alojamiento.puntuacion, 0);
      this.puntuacionMedia = (sumaPuntuaciones / this.alojamientos.length).toFixed(1); 
    }
  }

  getValoracionesPorPagina() {
    const start = this.currentValoracionIndex * this.valoracionesPorPagina;
    const end = start + this.valoracionesPorPagina;
    return this.valoraciones.slice(start, end);
  }

  prevValoracion() {
    if (this.currentValoracionIndex > 0) {
      this.currentValoracionIndex--;
      this.currentValoracionTranslate = this.currentValoracionIndex * 100;
    }
  }

  nextValoracion() {
    const totalPages = Math.ceil(this.valoraciones.length / this.valoracionesPorPagina);
    if (this.currentValoracionIndex < totalPages - 1) {
      this.currentValoracionIndex++;
      this.currentValoracionTranslate = this.currentValoracionIndex * 100;
    }
  }
}

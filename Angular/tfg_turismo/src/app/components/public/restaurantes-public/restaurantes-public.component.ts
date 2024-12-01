import { Component, OnInit } from '@angular/core';
import { Restaurante } from '../../../interfaces/restaurante.model';
import { RestauranteService } from '../../../service/restaurante.service';

@Component({
  selector: 'app-restaurantes-public',
  templateUrl: './restaurantes-public.component.html',
  styleUrls: ['./restaurantes-public.component.css']
})
export class RestaurantesPublicComponent implements OnInit {

  restaurantes: Restaurante[] = []; 
  precioPromedio: number = 0; 

  constructor(private restauranteService: RestauranteService) { }

  ngOnInit(): void {
    this.restauranteService.getRestaurantes().subscribe({
      next: (data) => {
        this.restaurantes = data; 
        this.calcularPrecioPromedio(); 
      },
      error: (error) => {
        console.error('Error al obtener restaurantes', error);
      }
    });
  }

  // Calcular precio promedio
  calcularPrecioPromedio(): void {
    if (this.restaurantes.length > 0) {
      const sumaPrecios = this.restaurantes.reduce((acc, restaurante) => acc + restaurante.precioPromedio, 0);
      this.precioPromedio = sumaPrecios / this.restaurantes.length;
    }
  }
}

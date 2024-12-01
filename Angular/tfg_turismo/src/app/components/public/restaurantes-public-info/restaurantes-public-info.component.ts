import { Component } from '@angular/core';
import { Restaurante } from '../../../interfaces/restaurante.model';
import { ActivatedRoute } from '@angular/router';
import { RestauranteService } from '../../../service/restaurante.service';

@Component({
  selector: 'app-restaurantes-public-info',
  templateUrl: './restaurantes-public-info.component.html',
  styleUrl: './restaurantes-public-info.component.css'
})
export class RestaurantesPublicInfoComponent {
  restaurante!: Restaurante; 
  error: string | null = null; 

  constructor(
    private restauranteService: RestauranteService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (isNaN(id)) {
      this.error = 'ID de restaurante inválido.';
      return;
    }

    this.restauranteService.getRestauranteById(id).subscribe({
      next: (data: Restaurante) => {
        this.restaurante = data;
      },
      error: (err) => {
        this.error = 'No se pudo cargar el restaurante.';
        console.error(err);
      }
    });
  }
}

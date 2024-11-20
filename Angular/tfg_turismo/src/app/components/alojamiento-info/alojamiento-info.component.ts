import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlojamientoService } from '../../service/alojamiento.service';
import { Alojamiento } from '../../interfaces/alojamiento.model';

@Component({
  selector: 'app-alojamiento-info',
  templateUrl: './alojamiento-info.component.html',
  styleUrl: './alojamiento-info.component.css'
})
export class AlojamientoInfoComponent {
  alojamiento: Alojamiento | null = null;

  constructor(
    private route: ActivatedRoute,
    private alojamientoService: AlojamientoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.alojamientoService.getAlojamientoById(id).subscribe(
        (data) => {
          this.alojamiento = data;
        },
        (error) => {
          console.error('Error al obtener los detalles del alojamiento:', error);
        }
      );
    }
  }
}

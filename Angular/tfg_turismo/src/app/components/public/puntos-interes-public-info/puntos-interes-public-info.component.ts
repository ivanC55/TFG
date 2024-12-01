import { Component } from '@angular/core';
import { PuntoDeInteres } from '../../../interfaces/punto-de-interes.model';
import { ActivatedRoute } from '@angular/router';
import { PuntoDeInteresService } from '../../../service/punto-de-interes.service';

@Component({
  selector: 'app-puntos-interes-public-info',
  templateUrl: './puntos-interes-public-info.component.html',
  styleUrl: './puntos-interes-public-info.component.css'
})
export class PuntosInteresPublicInfoComponent {
  puntoDeInteres!: PuntoDeInteres;  
  error: string | null = null;  

  constructor(
    private puntoDeInteresService: PuntoDeInteresService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (isNaN(id)) {
      this.error = 'ID de punto de interés inválido.';
      return;
    }

    this.puntoDeInteresService.getPuntoDeInteresById(id).subscribe({
      next: (data: PuntoDeInteres) => {
        this.puntoDeInteres = data;
      },
      error: (err) => {
        this.error = 'No se pudo cargar el punto de interés.';
        console.error(err);
      }
    });
  }
}

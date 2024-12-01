import { Component } from '@angular/core';
import { RutaTuristica } from '../../../interfaces/ruta-turistica.model';
import { ActivatedRoute } from '@angular/router';
import { RutaTuristicaService } from '../../../service/ruta-turistica.service.model';

@Component({
  selector: 'app-rutas-public-info',
  templateUrl: './rutas-public-info.component.html',
  styleUrl: './rutas-public-info.component.css'
})
export class RutasPublicInfoComponent {
  rutaTuristica!: RutaTuristica;  // Ruta que se mostrará en la página
  error: string | null = null;  // Para manejar errores en caso de que ocurra alguno

  constructor(
    private rutaTuristicaService: RutaTuristicaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (isNaN(id)) {
      this.error = 'ID de ruta inválido.';
      return;
    }

    this.rutaTuristicaService.getRutaById(id).subscribe({
      next: (data: RutaTuristica) => {
        this.rutaTuristica = data;
      },
      error: (err) => {
        this.error = 'No se pudo cargar la ruta.';
        console.error(err);
      }
    });
  }
}

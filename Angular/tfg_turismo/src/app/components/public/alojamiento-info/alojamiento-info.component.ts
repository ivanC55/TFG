import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlojamientoService } from '../../../service/alojamiento.service';
import { Alojamiento } from '../../../interfaces/alojamiento.model';
import { Valoracion } from '../../../interfaces/valoracion.model';
import { ValoracionService } from '../../../service/valoracion.service';

@Component({
  selector: 'app-alojamiento-info',
  templateUrl: './alojamiento-info.component.html',
  styleUrls: ['./alojamiento-info.component.css']
})
export class AlojamientoInfoComponent implements OnInit {
  alojamiento: Alojamiento | null = null;
  valoraciones: Valoracion[] = [];
  valoracionesFiltradas: Valoracion[] = [];
  indiceValoracionActual: number = 0;

  constructor(
    private route: ActivatedRoute,
    private alojamientoService: AlojamientoService,
    private valoracionService: ValoracionService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.alojamientoService.getAlojamientoById(id).subscribe(
        (data) => {
          this.alojamiento = data;

          this.valoracionService.getValoraciones().subscribe(
            (valoraciones) => {
              this.valoraciones = valoraciones;
              this.valoracionesFiltradas = this.valoraciones.filter(
                (valoracion) => valoracion.alojamiento.idAlojamiento === id
              );
            },
            (error) => {
              console.error('Error al obtener las valoraciones:', error);
            }
          );
        },
        (error) => {
          console.error('Error al obtener los detalles del alojamiento:', error);
        }
      );
    }
  }

  cambiarValoracion(cambio: number): void {
    const total = this.valoracionesFiltradas.length;
    if (total > 0) {
      this.indiceValoracionActual = (this.indiceValoracionActual + cambio + total) % total;
    }
  }
}

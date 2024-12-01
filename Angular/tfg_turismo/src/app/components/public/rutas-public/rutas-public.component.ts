import { Component, OnInit } from '@angular/core';
import { RutaTuristica } from '../../../interfaces/ruta-turistica.model';

@Component({
  selector: 'app-rutas-public',
  templateUrl: './rutas-public.component.html',
  styleUrls: ['./rutas-public.component.css']
})
export class RutasPublicComponent implements OnInit {
  rutas: RutaTuristica[] = [];
  duracionTotal: string = '';

  ngOnInit(): void {
    this.rutas = [
      {
        idRuta: 1,
        nombre: 'Ruta Histórica',
        tipo: 'Cultural',
        descripcion: 'Explora los principales monumentos históricos de la ciudad.',
        duracionEstimada: '2 horas',
        puntosInteres: 'Plaza Mayor, Catedral, Museo',
        mapaRuta: '../../../../assets/mapas/ruta-historica.jpg'
      },
      {
        idRuta: 2,
        nombre: 'Ruta Gastronómica',
        tipo: 'Gastronomía',
        descripcion: 'Disfruta de la mejor comida local mientras recorres la ciudad.',
        duracionEstimada: '3 horas',
        puntosInteres: 'Restaurante 1, Restaurante 2, Mercado Central',
        mapaRuta: '../../../../assets/mapas/ruta-gastronomica.jpg'
      }
    ];

    this.duracionTotal = `${this.rutas.length * 2} horas`; 
  }
}

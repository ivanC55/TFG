import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Alojamiento } from '../interfaces/alojamiento.model';  // Importar el modelo de Alojamiento
import { AlojamientoService } from '../service/alojamiento.service';  // Importar el servicio
import { MonumentoHistorico } from '../interfaces/monumento-historico.model';
import { HttpClient } from '@angular/common/http';
import { Restaurante } from '../interfaces/restaurante.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  alojamientos: Alojamiento[] = [];  
  restaurantes: Restaurante[] = [];
  monumentos: MonumentoHistorico[] = []; 
  currentTranslate: number = 0;
  currentRestaurantTranslate: number = 0;
  visibleCount: number = 3; 
  itemWidth: number = 0;
  restaurantItemWidth: number = 0;

  indiceMonumento: number = 0;

  @ViewChild('carousel') carousel!: ElementRef;
  @ViewChild('restaurantCarousel') restaurantCarousel!: ElementRef;

  constructor(private alojamientoService: AlojamientoService,
    private http: HttpClient
  ) { }  // Inyectar el servicio

  ngOnInit(): void {
    this.listAlojamientos();
    this.listMonumentos();
    this.listRestaurantes();  
  }

  listAlojamientos() {
    this.alojamientoService.getAlojamientosList().subscribe(
      (data) => {
        this.alojamientos = data;  
        this.itemWidth = document.getElementById('carousel')!.offsetWidth / this.visibleCount;
          
      },
      (error) => {
        console.error('Error fetching alojamientos:', error);  // Manejar errores
      }
    );
  }

  listRestaurantes() {
    this.http.get<any[]>('http://localhost:8081/api/restaurantes').subscribe(
      (data) => {
        this.restaurantes = data;
        setTimeout(() => this.calculateRestaurantItemWidth(), 0);
      },
      (error) => console.error('Error fetching restaurantes:', error)
    );
  }

  calculateRestaurantItemWidth(): void {
    const restaurantCarouselElement = this.restaurantCarousel?.nativeElement;
    if (restaurantCarouselElement) {
      this.restaurantItemWidth = restaurantCarouselElement.offsetWidth / this.visibleCount;
    }
  }

  listMonumentos() {
    this.http.get<MonumentoHistorico[]>('http://localhost:8081/api/monumentos').subscribe(
      (data) => {
        this.monumentos = data;  
        console.log(this.monumentos);  
      },
      (error) => {
        console.error('Error fetching monumentos:', error);  
      }
    );
  }

    prev() {
      const maxTranslate = 0;
      this.currentTranslate = Math.max(this.currentTranslate - this.itemWidth, maxTranslate);
    }
  
    next() {
      const maxTranslate = (this.alojamientos.length - this.visibleCount) * this.itemWidth;
      this.currentTranslate = Math.min(this.currentTranslate + this.itemWidth, maxTranslate);
    }

    prevRestaurant() {
      this.currentRestaurantTranslate = Math.max(this.currentRestaurantTranslate - this.restaurantItemWidth, 0);
    }
  
    nextRestaurant() {
      const maxRestaurantTranslate = Math.max(0, (this.restaurantes.length - this.visibleCount) * this.restaurantItemWidth);
      this.currentRestaurantTranslate = Math.min(this.currentRestaurantTranslate + this.restaurantItemWidth, maxRestaurantTranslate);
    }

    cambiarMonumento(direccion: number): void {
      const totalMonumentos = this.monumentos.length;
  
      this.indiceMonumento = (this.indiceMonumento + direccion + totalMonumentos) % totalMonumentos;
    }
}

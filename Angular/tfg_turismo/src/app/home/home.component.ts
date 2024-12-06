import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Alojamiento } from '../interfaces/alojamiento.model';
import { AlojamientoService } from '../service/alojamiento.service';
import { MonumentoHistorico } from '../interfaces/monumento-historico.model';
import { HttpClient } from '@angular/common/http';
import { Restaurante } from '../interfaces/restaurante.model';
import { Valoracion } from '../interfaces/valoracion.model'; // Importa la interfaz de Valoración
import { ValoracionService } from '../service/valoracion.service'; // Importa el servicio de valoraciones

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  alojamientos: Alojamiento[] = [];
  restaurantes: Restaurante[] = [];
  monumentos: MonumentoHistorico[] = [];
  valoraciones: Valoracion[] = []; // Nueva propiedad para valoraciones
  currentTranslate: number = 0;
  currentRestaurantTranslate: number = 0;
  currentValoracionTranslate: number = 0; // Nueva propiedad para desplazamiento del carrusel de valoraciones
  visibleCount: number = 3;
  itemWidth: number = 0;
  restaurantItemWidth: number = 0;
  valoracionItemWidth: number = 0;
  currentValoracionIndex: number = 0;  
  valoracionesPorPagina: number = 3; // Número de valoraciones a mostrar por página

  indiceMonumento: number = 0;

  @ViewChild('carousel') carousel!: ElementRef;
  @ViewChild('restaurantCarousel') restaurantCarousel!: ElementRef;
  @ViewChild('valoracionesCarousel') valoracionesCarousel!: ElementRef; // Referencia al carrusel de valoraciones

  constructor(
    private alojamientoService: AlojamientoService,
    private http: HttpClient,
    private valoracionService: ValoracionService // Inyectar el servicio de valoraciones
  ) { }

  ngOnInit(): void {
    this.listAlojamientos();
    this.listMonumentos();
    this.listRestaurantes();
    this.listValoraciones(); // Cargar las valoraciones
  }

  listAlojamientos() {
    this.alojamientoService.getAlojamientosList().subscribe(
      (data) => {
        this.alojamientos = data;
        this.itemWidth = document.getElementById('carousel')!.offsetWidth / this.visibleCount;
      },
      (error) => {
        console.error('Error fetching alojamientos:', error);
      }
    );
  }

  listRestaurantes() {
    this.http.get<Restaurante[]>('http://localhost:8081/api/restaurantes').subscribe(
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
      },
      (error) => {
        console.error('Error fetching monumentos:', error);
      }
    );
  }

  listValoraciones() {
    this.valoracionService.getValoraciones().subscribe(
      (data) => {
        this.valoraciones = data;
        setTimeout(() => this.calculateValoracionItemWidth(), 0);  // Asegúrate de que el cálculo se haga después de que los datos estén disponibles
      },
      (error) => {
        console.error('Error fetching valoraciones:', error);
      }
    );
  }
  
  calculateValoracionItemWidth(): void {
    const valoracionesCarouselElement = this.valoracionesCarousel?.nativeElement;
    if (valoracionesCarouselElement) {
      this.valoracionItemWidth = valoracionesCarouselElement.offsetWidth / this.visibleCount;
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
      this.currentValoracionTranslate = this.currentValoracionIndex * this.valoracionItemWidth;
    }
  }
  
  nextValoracion() {
    const totalPages = Math.ceil(this.valoraciones.length / this.valoracionesPorPagina); // Total de páginas
    if (this.currentValoracionIndex < totalPages - 1) {
      this.currentValoracionIndex++;
      this.currentValoracionTranslate = this.currentValoracionIndex * this.valoracionItemWidth;
    }
  }
  
  prev() {
    const maxTranslate = 0;
    this.currentTranslate = Math.max(this.currentTranslate - this.itemWidth, maxTranslate);
  }

  next() {
    const maxTranslate = (this.alojamientos.length - this.visibleCount) * this.itemWidth;
    this.currentTranslate = Math.min(this.currentTranslate + this.itemWidth, maxTranslate);
  }

  // Navegación del carrusel de restaurantes
  prevRestaurant() {
    this.currentRestaurantTranslate = Math.max(this.currentRestaurantTranslate - this.restaurantItemWidth, 0);
  }

  nextRestaurant() {
    const maxRestaurantTranslate = Math.max(0, (this.restaurantes.length - this.visibleCount) * this.restaurantItemWidth);
    this.currentRestaurantTranslate = Math.min(this.currentRestaurantTranslate + this.restaurantItemWidth, maxRestaurantTranslate);
  }

  // Cambiar entre monumentos
  cambiarMonumento(direccion: number): void {
    const totalMonumentos = this.monumentos.length;
    this.indiceMonumento = (this.indiceMonumento + direccion + totalMonumentos) % totalMonumentos;
  }
}

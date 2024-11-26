import { Component, OnInit } from '@angular/core';
import { Alojamiento } from '../interfaces/alojamiento.model';  // Importar el modelo de Alojamiento
import { AlojamientoService } from '../service/alojamiento.service';  // Importar el servicio
import { MonumentoHistorico } from '../interfaces/monumento-historico.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  alojamientos: Alojamiento[] = [];  
  monumentos: MonumentoHistorico[] = []; 

  constructor(private alojamientoService: AlojamientoService,
    private http: HttpClient
  ) { }  // Inyectar el servicio

  ngOnInit(): void {
    this.listAlojamientos();
    this.listMonumentos();  
  }

  listAlojamientos() {
    this.alojamientoService.getAlojamientosList().subscribe(
      (data) => {
        this.alojamientos = data;  // Guardar los alojamientos obtenidos del backend
        console.log(this.alojamientos);  // Ver los datos en la consola para depurar
      },
      (error) => {
        console.error('Error fetching alojamientos:', error);  // Manejar errores
      }
    );
  }

  // Obtener la lista de monumentos desde el backend
  listMonumentos() {
    this.http.get<MonumentoHistorico[]>('http://localhost:8081/api/monumentos').subscribe(
      (data) => {
        this.monumentos = data;  // Guardar los monumentos obtenidos del backend
        console.log(this.monumentos);  // Ver los datos en la consola para depurar
      },
      (error) => {
        console.error('Error fetching monumentos:', error);  // Manejar errores
      }
    );
  }
}

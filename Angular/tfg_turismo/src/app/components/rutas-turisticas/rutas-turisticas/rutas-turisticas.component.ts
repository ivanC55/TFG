import { Component, OnInit } from '@angular/core';
import { RutaTuristicaService } from '../../../service/ruta-turistica.service.model';
import { RutaTuristica } from '../../../interfaces/ruta-turistica.model';

@Component({
  selector: 'app-rutas-turisticas',
  templateUrl: './rutas-turisticas.component.html',
  styleUrls: ['./rutas-turisticas.component.css']
})
export class RutasTuristicasComponent implements OnInit {
  rutas: RutaTuristica[] = [];
  rutaSeleccionada: RutaTuristica = {
    idRuta: 0,
    nombre: '',
    tipo: '',
    descripcion: '',
    duracionEstimada: '',
    puntosInteres: '',
    mapaRuta: ''
  };
  modoFormulario = false;

  constructor(private rutaService: RutaTuristicaService) { }

  ngOnInit(): void {
    this.cargarRutas();
  }

  cargarRutas(): void {
    this.rutaService.getRutas().subscribe((data) => {
      this.rutas = data;
    });
  }

  mostrarFormulario(ruta?: RutaTuristica): void {
    this.rutaSeleccionada = ruta
      ? { ...ruta }
      : {
        idRuta: 0,
        nombre: '',
        tipo: '',
        descripcion: '',
        duracionEstimada: '',
        puntosInteres: '',
        mapaRuta: ''
      };
    this.modoFormulario = true;
  }

  guardarRuta(): void {
    if (this.rutaSeleccionada.idRuta) {
      this.rutaService
        .updateRuta(this.rutaSeleccionada.idRuta, this.rutaSeleccionada)
        .subscribe(() => {
          this.cargarRutas();
          this.modoFormulario = false;
        });
    } else {
      this.rutaService.createRuta(this.rutaSeleccionada).subscribe(() => {
        this.cargarRutas();
        this.modoFormulario = false;
      });
    }
  }

  eliminarRuta(id: number): void {
    if (confirm('¿Deseas eliminar esta ruta turística?')) {
      this.rutaService.deleteRuta(id).subscribe(() => {
        this.cargarRutas();
      });
    }
  }

  cancelarFormulario(): void {
    this.modoFormulario = false;
  }
}

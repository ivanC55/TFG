import { Component, OnInit } from '@angular/core';
import { PuntoDeInteresService } from '../../../service/punto-de-interes.service';
import { PuntoDeInteres } from '../../../interfaces/punto-de-interes.model';

@Component({
  selector: 'app-puntos-de-interes',
  templateUrl: './puntos-de-interes.component.html',
  styleUrls: ['./puntos-de-interes.component.css']
})
export class PuntosDeInteresComponent implements OnInit {
  puntos: PuntoDeInteres[] = [];
  puntoSeleccionado: PuntoDeInteres = {
    idPunto: 0,
    nombre: '',
    descripcion: '',
    coordenadas: '',
    orden: 0,
    ruta: null,
  };
  modoFormulario = false;

  constructor(private puntoService: PuntoDeInteresService) { }

  ngOnInit(): void {
    this.cargarPuntos();
  }

  cargarPuntos(): void {
    this.puntoService.getPuntosDeInteres().subscribe((data) => {
      this.puntos = data;
    });
  }

  mostrarFormulario(punto?: PuntoDeInteres): void {
    this.puntoSeleccionado = punto
      ? { ...punto }
      : {
        idPunto: 0,
        nombre: '',
        descripcion: '',
        coordenadas: '',
        orden: 0,
        ruta: null,
      };
    this.modoFormulario = true;
  }

  guardarPunto(): void {
    if (this.puntoSeleccionado.idPunto) {
      this.puntoService
        .updatePuntoDeInteres(this.puntoSeleccionado.idPunto, this.puntoSeleccionado)
        .subscribe(() => {
          this.cargarPuntos();
          this.modoFormulario = false;
        });
    } else {
      this.puntoService.createPuntoDeInteres(this.puntoSeleccionado).subscribe(() => {
        this.cargarPuntos();
        this.modoFormulario = false;
      });
    }
  }

  eliminarPunto(id: number): void {
    if (confirm('¿Deseas eliminar este punto de interés?')) {
      this.puntoService.deletePuntoDeInteres(id).subscribe(() => {
        this.cargarPuntos();
      });
    }
  }

  cancelarFormulario(): void {
    this.modoFormulario = false;
  }
}

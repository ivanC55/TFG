import { Component, OnInit } from '@angular/core';
import { PuntoDeInteresService } from '../../../service/punto-de-interes.service';
import { PuntoDeInteres } from '../../../interfaces/punto-de-interes.model'; // Ruta del modelo correcto
import { Router } from '@angular/router';

@Component({
  selector: 'app-puntos-de-interes',
  templateUrl: './puntos-de-interes.component.html',
  styleUrls: ['./puntos-de-interes.component.css'],
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
  modoEdicion = false; // Controla si el modal de edición está visible
  puntoParaEliminar: PuntoDeInteres | null = null; // Para la eliminación

  constructor(private puntoService: PuntoDeInteresService, private router: Router) { }

  ngOnInit(): void {
    this.cargarPuntos();
  }

  cargarPuntos(): void {
    this.puntoService.getPuntosDeInteres().subscribe((data) => {
      this.puntos = data;
    });
  }

  mostrarFormulario(): void {
    this.modoEdicion = true;
    this.puntoSeleccionado = {
      idPunto: 0,
      nombre: '',
      descripcion: '',
      coordenadas: '',
      orden: 0,
      ruta: null,
    };
  }

  editarPunto(punto: PuntoDeInteres): void {
    this.puntoSeleccionado = { ...punto }; // Copiar los datos del punto seleccionado
    this.modoEdicion = true; // Mostrar el modal de edición
  }

  cancelarEdicion(): void {
    this.modoEdicion = false; // Cerrar el modal de edición
  }

  guardarPunto(punto: PuntoDeInteres): void {
    if (!punto.nombre || !punto.descripcion || !punto.coordenadas || punto.orden == null) {
      alert('Todos los campos son obligatorios');
      return;
    }

    if (punto.idPunto) {
      this.puntoService.updatePuntoDeInteres(punto.idPunto, punto).subscribe(() => {
        this.modoEdicion = false;
        this.cargarPuntos();
      });
    } else {
      this.puntoService.createPuntoDeInteres(punto).subscribe(() => {
        this.modoEdicion = false;
        this.cargarPuntos();
      });
    }
  }

  mostrarModalEliminar(punto: PuntoDeInteres): void {
    this.puntoParaEliminar = punto; // Seleccionar el punto para eliminar
  }

  cancelarEliminar(): void {
    this.puntoParaEliminar = null; // Cerrar el modal sin eliminar
  }

  confirmarEliminar(): void {
    if (this.puntoParaEliminar && this.puntoParaEliminar.idPunto !== undefined) {
      this.puntoService.deletePuntoDeInteres(this.puntoParaEliminar.idPunto).subscribe(() => {
        this.puntoParaEliminar = null;
        this.cargarPuntos();
      });
    }
  }
}

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
  mostrarModalFormulario: boolean = false; // Controla si el modal de formulario está visible
  mostrarModalEliminar: boolean = false; // Controla si el modal de eliminación está visible

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
    this.mostrarModalFormulario = true;
  }

  guardarRuta(): void {
    if (this.rutaSeleccionada.idRuta === 0) {
      // Crear nueva ruta
      this.rutaService.createRuta(this.rutaSeleccionada).subscribe(() => {
        this.cargarRutas();
        this.mostrarModalFormulario = false;
      });
    } else {
      // Actualizar ruta existente
      this.rutaService.updateRuta(this.rutaSeleccionada.idRuta, this.rutaSeleccionada).subscribe(() => {
        this.cargarRutas();
        this.mostrarModalFormulario = false;
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
    this.mostrarModalFormulario = false;
  }

  // Abre el modal de eliminación de ruta
  abrirModalEliminar(ruta: RutaTuristica): void {
    this.rutaSeleccionada = { ...ruta };
    this.mostrarModalEliminar = true;
  }

  // Cierra el modal de eliminación de ruta
  cancelarEliminar(): void {
    this.mostrarModalEliminar = false;
  }

  // Confirma la eliminación de la ruta
  confirmarEliminar(): void {
    if (this.rutaSeleccionada && this.rutaSeleccionada.idRuta !== undefined) {
      this.eliminarRuta(this.rutaSeleccionada.idRuta);
      this.mostrarModalEliminar = false;
    }
  }
}

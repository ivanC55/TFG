import { Component, OnInit } from '@angular/core';
import { MonumentoHistoricoService } from '../../../service/monumento-historico.service';
import { MonumentoHistorico } from '../../../interfaces/monumento-historico.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monumentos',
  templateUrl: './monumentos.component.html',
  styleUrls: ['./monumentos.component.css']
})
export class MonumentosComponent implements OnInit {
  monumentos: MonumentoHistorico[] = [];
  monumentoSeleccionado: MonumentoHistorico = {
    idMonumento: 0,
    nombre: '',
    historia: '',
    tipo: '',
    ubicacion: '',
    horario: '',
    precio_entrada: 0,
    imagen: ''
  };
  modoFormulario = false;

  constructor(private monumentoService: MonumentoHistoricoService, private router: Router) { }

  ngOnInit(): void {
    this.cargarMonumentos();
  }

  cargarMonumentos(): void {
    this.monumentoService.getMonumentos().subscribe((data) => {
      this.monumentos = data;
    });
  }

  verDetalles(id: number): void {
    this.router.navigate(['/monumentos', id]);
  }

  mostrarFormulario(monumento?: MonumentoHistorico): void {
    // Si no se pasa un monumento, creamos uno vacío para el formulario.
    this.monumentoSeleccionado = monumento ? { ...monumento } : {
      idMonumento: 0,
      nombre: '',
      historia: '',
      tipo: '',
      ubicacion: '',
      horario: '',
      precio_entrada: 0,
      imagen: ''
    };
    this.modoFormulario = true;
  }

  guardarMonumento(): void {
    if (!this.monumentoSeleccionado) return;

    // Si tiene un id, significa que estamos editando un monumento.
    if (this.monumentoSeleccionado.idMonumento) {
      this.monumentoService.updateMonumento(
        this.monumentoSeleccionado.idMonumento,
        this.monumentoSeleccionado
      ).subscribe(() => {
        this.modoFormulario = false;
        this.cargarMonumentos();
      });
    } else {
      // Si no tiene id, estamos creando un nuevo monumento.
      this.monumentoService.createMonumento(this.monumentoSeleccionado).subscribe(() => {
        this.modoFormulario = false;
        this.cargarMonumentos();
      });
    }
  }

  eliminarMonumento(id: number): void {
    if (confirm('¿Deseas eliminar este monumento?')) {
      this.monumentoService.deleteMonumento(id).subscribe(() => {
        this.cargarMonumentos();
      });
    }
  }

  cancelarFormulario(): void {
    this.monumentoSeleccionado = {
      idMonumento: 0,
      nombre: '',
      historia: '',
      tipo: '',
      ubicacion: '',
      horario: '',
      precio_entrada: 0,
      imagen: ''
    };
    this.modoFormulario = false;
  }
}

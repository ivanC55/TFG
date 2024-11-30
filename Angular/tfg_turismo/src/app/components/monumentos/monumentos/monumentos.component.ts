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
  modoFormulario = false;  // Controla si el formulario está visible
  modoEdicion = false;  // Controla si el modal de edición está visible
  monumentoParaEliminar: MonumentoHistorico | null = null;  // Monumento seleccionado para eliminación
isEditing: any;

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

  mostrarFormulario(): void {
    this.modoEdicion = true;
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
    this.modoFormulario = true;
  }

  editarMonumento(monumento: MonumentoHistorico): void {
    this.monumentoSeleccionado = { ...monumento };
    this.modoEdicion = true;  // Mostrar el modal de edición
  }

  cancelarEdicion(): void {
    this.modoEdicion = false;  // Cerrar el modal de edición
  }

  guardarMonumento(): void {
    if (!this.monumentoSeleccionado.nombre || !this.monumentoSeleccionado.historia || 
        !this.monumentoSeleccionado.tipo || !this.monumentoSeleccionado.ubicacion || 
        !this.monumentoSeleccionado.precio_entrada) {
      alert('Todos los campos son obligatorios');
      return;
    }
  
    // Si el monumento tiene id, estamos editando un monumento
    if (this.monumentoSeleccionado.idMonumento) {
      this.monumentoService.updateMonumento(this.monumentoSeleccionado.idMonumento, this.monumentoSeleccionado)
        .subscribe(() => {
          this.modoEdicion = false;
          this.cargarMonumentos();  // Recargar la lista de monumentos
        });
    } else {
      // Si no tiene id, estamos creando un nuevo monumento
      this.monumentoService.createMonumento(this.monumentoSeleccionado)
        .subscribe(() => {
          this.modoEdicion = false;
          this.cargarMonumentos();  // Recargar la lista de monumentos
        });
    }
  }
  
  mostrarModalEliminar(monumento: MonumentoHistorico): void {
    this.monumentoParaEliminar = monumento;  // Seleccionar el monumento para eliminar
  }

  cancelarEliminar(): void {
    this.monumentoParaEliminar = null;  // Cerrar el modal de eliminación sin hacer nada
  }

  confirmarEliminar(): void {
    if (this.monumentoParaEliminar) {
      this.monumentoService.deleteMonumento(this.monumentoParaEliminar.idMonumento).subscribe(() => {
        this.monumentoParaEliminar = null;  // Cerrar el modal de eliminación
        this.cargarMonumentos();  // Recargar la lista de monumentos
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

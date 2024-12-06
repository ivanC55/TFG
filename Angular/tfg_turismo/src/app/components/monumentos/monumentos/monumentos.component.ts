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
  monumentoParaEliminar: MonumentoHistorico | null = null;  // Monumento seleccionado para eliminación
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null; // Previsualización de la imagen

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
    this.previewUrl = null; // Limpiar previsualización
    this.selectedFile = null; // Limpiar archivo seleccionado
  }

  editarMonumento(monumento: MonumentoHistorico): void {
    this.monumentoSeleccionado = { ...monumento };
    this.modoFormulario = true;  // Abrir el formulario para editar
    this.previewUrl = `http://localhost:8081/uploads/monumentos/${monumento.imagen}`; // Previsualización de la imagen
  }

  cancelarEdicion(): void {
    this.modoFormulario = false;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.selectedFile = file;

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  guardarMonumento(): void {
    if (!this.monumentoSeleccionado.nombre || !this.monumentoSeleccionado.historia ||
      !this.monumentoSeleccionado.tipo || !this.monumentoSeleccionado.ubicacion ||
      !this.monumentoSeleccionado.precio_entrada) {
      alert('Todos los campos son obligatorios');
      return;
    }

    const esEdicion = !!this.monumentoSeleccionado.idMonumento;

    if (esEdicion) {
      this.monumentoService.updateMonumento(this.monumentoSeleccionado.idMonumento, this.monumentoSeleccionado)
        .subscribe(() => {
          if (this.selectedFile) {
            this.subirImagen(this.monumentoSeleccionado.idMonumento);
          } else {
            this.finalizarGuardado();
          }
        }, error => {
          console.error('Error al actualizar el monumento', error);
          alert('Hubo un error al actualizar el monumento.');
        });
    } else {
      this.monumentoService.createMonumento(this.monumentoSeleccionado)
        .subscribe((nuevoMonumento) => {
          if (this.selectedFile) {
            this.subirImagen(nuevoMonumento.idMonumento);
          } else {
            this.finalizarGuardado();
          }
        }, error => {
          console.error('Error al crear el monumento', error);
          alert('Hubo un error al crear el monumento.');
        });
    }
  }

  private subirImagen(id: number): void {
    if (this.selectedFile) {
      this.monumentoService.uploadImage(id, this.selectedFile)
        .subscribe(() => {
          this.finalizarGuardado();
        }, error => {
          console.error('Error al subir la imagen', error);
          alert('Error al subir la imagen.');
        });
    }
  }

  private finalizarGuardado(): void {
    this.modoFormulario = false;
    this.cargarMonumentos();
    this.selectedFile = null; 
    this.previewUrl = null; 
  }

  mostrarModalEliminar(monumento: MonumentoHistorico): void {
    this.monumentoParaEliminar = monumento;
  }

  cancelarEliminar(): void {
    this.monumentoParaEliminar = null;
  }

  confirmarEliminar(): void {
    if (this.monumentoParaEliminar) {
      this.monumentoService.deleteMonumento(this.monumentoParaEliminar.idMonumento).subscribe(() => {
        this.monumentoParaEliminar = null;
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
    this.previewUrl = null;
    this.selectedFile = null;
  }
}

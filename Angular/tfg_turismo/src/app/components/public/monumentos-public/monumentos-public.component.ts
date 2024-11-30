import { Component } from '@angular/core';
import { MonumentoHistoricoService } from '../../../service/monumento-historico.service';
import { MonumentoHistorico } from '../../../interfaces/monumento-historico.model';

@Component({
  selector: 'app-monumentos-public',
  templateUrl: './monumentos-public.component.html',
  styleUrl: './monumentos-public.component.css'
})
export class MonumentosPublicComponent {

  monumentos: MonumentoHistorico[] = [];  

  constructor(private monumentoService: MonumentoHistoricoService) { }

  ngOnInit(): void {
    this.monumentoService.getMonumentos().subscribe({
      next: (data) => {
        this.monumentos = data;  
      },
      error: (error) => {
        console.error('Error al obtener monumentos', error);
      }
    });
  }

}

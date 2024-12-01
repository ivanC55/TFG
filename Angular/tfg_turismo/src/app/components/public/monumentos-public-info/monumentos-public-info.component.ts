import { Component } from '@angular/core';
import { MonumentoHistorico } from '../../../interfaces/monumento-historico.model';
import { MonumentoHistoricoService } from '../../../service/monumento-historico.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-monumentos-public-info',
  templateUrl: './monumentos-public-info.component.html',
  styleUrl: './monumentos-public-info.component.css'
})
export class MonumentosPublicInfoComponent {
  monumento!: MonumentoHistorico; 
  error: string | null = null; 

  constructor(
    private monumentoService: MonumentoHistoricoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (isNaN(id)) {
      this.error = 'ID de monumento inválido.';
      return;
    }

    this.monumentoService.getMonumentoById(id).subscribe({
      next: (data: MonumentoHistorico) => {
        this.monumento = data;
      },
      error: (err) => {
        this.error = 'No se pudo cargar el monumento.';
        console.error(err);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlojamientoService } from '../../service/alojamiento.service';
import { Alojamiento } from '../../interfaces/alojamiento.model';
import { Reserva } from '../../interfaces/reserva.model';
import { ReservaService } from '../../service/reserva.service';

@Component({
  selector: 'app-alojamiento-info',
  templateUrl: './alojamiento-info.component.html',
  styleUrls: ['./alojamiento-info.component.css']
})
export class AlojamientoInfoComponent implements OnInit {
  alojamiento: Alojamiento | null = null;

  // Instanciación inicial de la reserva con valores válidos (aún no se usará)
  reserva: Reserva = {
    idReserva: undefined,
    usuario: {
      id: undefined,
      username: '',
      nombre: '',
      apellidos: '',
      password: '',
      email: '',
      telefono: '',
      direccion: '',
      rol: ''
    },
    alojamiento: null,
    restaurante: null,
    fechaReserva: '',
    horaReserva: '',
    numPersonas: 1,
    estado: ''
  };

  constructor(
    private route: ActivatedRoute,
    private alojamientoService: AlojamientoService,
    private reservaService: ReservaService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.alojamientoService.getAlojamientoById(id).subscribe(
        (data) => {
          this.alojamiento = data;

          // Asignación segura de valores a la reserva (aunque no se usará por ahora)
          this.reserva.alojamiento = {
            idAlojamiento: data.idAlojamiento!,
            nombre: data.nombre!,
            ubicacion: data.ubicacion!,
            precioNoche: data.precioNoche!,
            tipo: data.tipo!,
            servicios: data.servicios!,
            puntuacion: data.puntuacion!
          };
        },
        (error) => {
          console.error('Error al obtener los detalles del alojamiento:', error);
        }
      );
    }
  }

  // Esta función ya no se usará por ahora, solo se eliminará el formulario de reserva
  realizarReserva(): void {
    // Ya no necesitamos este código
    alert('La opción de reserva está deshabilitada temporalmente.');
  }
}

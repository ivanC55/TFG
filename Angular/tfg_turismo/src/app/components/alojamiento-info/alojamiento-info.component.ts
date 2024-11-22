import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlojamientoService } from '../../service/alojamiento.service';
import { Alojamiento } from '../../interfaces/alojamiento.model';
import { Reserva } from '../../interfaces/reserva.model';
import { ReservaService } from '../../service/reserva.service';
import { Usuario } from '../../interfaces/usuario.model'; // Importa el modelo Usuario

@Component({
  selector: 'app-alojamiento-info',
  templateUrl: './alojamiento-info.component.html',
  styleUrls: ['./alojamiento-info.component.css']
})
export class AlojamientoInfoComponent implements OnInit {
  alojamiento: Alojamiento | null = null;

  // Crear una instancia de reserva con todos los campos de la interfaz Reserva
  reserva: Reserva = {
    idReserva: undefined,
    usuario: {
      id: undefined,           // Propiedad opcional, puedes dejar undefined
      username: '',            // Agregar el campo username
      nombre: '',              // Ya tienes este campo
      apellidos: '',           // Agregar el campo apellidos
      password: '',            // Agregar el campo password
      email: '',               // Ya tienes este campo
      telefono: '',            // Agregar el campo telefono
      direccion: '',           // Agregar el campo direccion
      rol: ''                  // Agregar el campo rol
    },
    alojamiento: { idAlojamiento: undefined, nombre: '', ubicacion: '', precioNoche: 0, tipo: '', servicios: '', puntuacion: 0 },
    restaurante: { idRestaurante: undefined, nombre: '', ubicacion: '', tipoComida: '', especialidad: '', precioPromedio: 0, horario: '', puntuacion: 0 },
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
          // Asignar los valores al objeto alojamiento en reserva
          this.reserva.alojamiento = {
            idAlojamiento: data.idAlojamiento,
            nombre: data.nombre,
            ubicacion: data.ubicacion,
            precioNoche: data.precioNoche,
            tipo: data.tipo,
            servicios: data.servicios,
            puntuacion: data.puntuacion
          };
        },
        (error) => {
          console.error('Error al obtener los detalles del alojamiento:', error);
        }
      );
    }
  }

  realizarReserva(): void {
    // Asegurarse de que el objeto reserva esté completo
    if (this.reserva.usuario.nombre && this.reserva.usuario.email && this.reserva.fechaReserva) {
      // Formatear la fecha y hora según lo que espera el backend
      this.reserva.fechaReserva = new Date(this.reserva.fechaReserva).toISOString().split('T')[0]; // "yyyy-MM-dd"
      this.reserva.horaReserva = this.reserva.horaReserva ? this.reserva.horaReserva : '12:00:00'; // Default hora si no se especifica

      // Llamar al servicio de reservas para guardar la reserva
      this.reservaService.createReserva(this.reserva).subscribe(
        (response) => {
          alert('Reserva realizada con éxito.');
          this.reserva = { // Reiniciar el formulario
            idReserva: undefined,
            usuario: { id: undefined, username: '', nombre: '', apellidos: '', password: '', email: '', telefono: '', direccion: '', rol: '' },
            alojamiento: { idAlojamiento: undefined, nombre: '', ubicacion: '', precioNoche: 0, tipo: '', servicios: '', puntuacion: 0 },
            restaurante: { idRestaurante: undefined, nombre: '', ubicacion: '', tipoComida: '', especialidad: '', precioPromedio: 0, horario: '', puntuacion: 0 },
            fechaReserva: '',
            horaReserva: '',
            numPersonas: 1,
            estado: ''
          };
        },
        (error) => {
          console.error('Error al realizar la reserva:', error);
          alert('Ocurrió un error al realizar la reserva.');
        }
      );
    } else {
      alert('Por favor, completa todos los campos.');
    }
  }

}

package com.turismo.model.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "reservas")
@Getter
@Setter
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idReserva;

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_alojamiento", nullable = true)
    private Alojamiento alojamiento;

    @ManyToOne
    @JoinColumn(name = "id_restaurante", nullable = true)
    private Restaurante restaurante;

    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private LocalTime horaEntrada;
    private Integer numPersonas;
    private String estado;
}

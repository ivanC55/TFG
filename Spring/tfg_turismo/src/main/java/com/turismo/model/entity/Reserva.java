package com.turismo.model.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.sql.Time;


@Entity
@Table(name = "reservas")
@Getter
@Setter
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idReserva;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "id_alojamiento" , nullable = true)
    private Alojamiento alojamiento;

    @ManyToOne
    @JoinColumn(name = "id_restaurante" , nullable = true)
    private Restaurante restaurante;

    private LocalDate fechaReserva;
    private LocalTime horaReserva;
    private Integer numPersonas;
    private String estado;
}

package com.turismo.model.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @JsonBackReference("usuario-reservas") // Identificador único
    private Usuario usuario;

    // Relación con Alojamiento
    @ManyToOne
    @JoinColumn(name = "id_alojamiento", nullable = true)
    @JsonBackReference("alojamiento-reservas") // Identificador único
    private Alojamiento alojamiento;

    // Relación con Restaurante
    @ManyToOne
    @JoinColumn(name = "id_restaurante", nullable = true)
    @JsonBackReference("restaurante-reservas") // Identificador único
    private Restaurante restaurante;

    private LocalDate fechaReserva;
    private LocalTime horaReserva;
    private Integer numPersonas;
    private String estado;
}

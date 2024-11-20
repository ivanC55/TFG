package com.turismo.model.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "alojamientos")
@Getter
@Setter
public class Alojamiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAlojamiento;

    private String nombre;
    private String tipo;
    private String ubicacion;
    private Double precioNoche;
    @Column(columnDefinition = "TEXT")
    private String servicios;
    private Double puntuacion;
}
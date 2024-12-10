package com.turismo.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "puntosdeinteres")
@Getter
@Setter
public class PuntoDeInteres {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPunto;

    private String nombre;
    @Column(columnDefinition = "TEXT")
    private String descripcion;
    private String ubicacion;
    private String imagen;
}
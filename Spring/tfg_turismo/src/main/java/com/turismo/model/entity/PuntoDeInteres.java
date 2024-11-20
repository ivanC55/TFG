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

    @ManyToOne
    @JoinColumn(name = "id_ruta")
    private RutaTuristica ruta;

    private String nombre;
    @Column(columnDefinition = "TEXT")
    private String descripcion;
    private String coordenadas; // Cambiarlo a la clase correcta si `Point` está disponible en tu setup
    private Integer orden;
}
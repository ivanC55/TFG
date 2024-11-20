package com.turismo.model.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "rutasturisticas")
@Getter
@Setter
public class RutaTuristica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRuta;

    private String nombre;
    private String tipo;
    @Column(columnDefinition = "TEXT")
    private String descripcion;
    private String duracionEstimada;
    @Column(columnDefinition = "JSON")
    private String puntosInteres; // Cambiarlo si tienes una clase específica para JSON
    private String mapaRuta;
}

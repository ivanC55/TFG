package com.turismo.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "valoraciones")
@Getter
@Setter
public class Valoracion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idValoracion;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    private Long idItem; // Puede ser id de alojamiento, restaurante, etc.
    private String tipo; // Define el tipo (Alojamiento, Restaurante, etc.)
    private Double puntuacion;
    @Column(columnDefinition = "TEXT")
    private String comentario;
}

package com.turismo.model.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "restaurantes")
@Getter
@Setter
public class Restaurante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRestaurante;

    @JsonProperty("nombre")
    private String nombre;
    private String tipoComida;
    private String especialidad;
    private String ubicacion;
    private Double precioPromedio;
    private String horario;
    private Double puntuacion;
    private String imagen;
}

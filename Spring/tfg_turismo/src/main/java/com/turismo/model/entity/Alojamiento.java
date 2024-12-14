package com.turismo.model.entity;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "alojamientos")
@Getter
@Setter
public class Alojamiento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAlojamiento;

    @JsonProperty("nombre")
    private String nombre;
    private String tipo;
    private String ubicacion;
    private Double precioNoche;

    @ElementCollection
    @CollectionTable(name = "alojamiento_servicios", joinColumns = @JoinColumn(name = "id_alojamiento"))
    @Column(name = "servicio")
    private List<String> servicios;

    private Double puntuacion;
    private String imagen;
}

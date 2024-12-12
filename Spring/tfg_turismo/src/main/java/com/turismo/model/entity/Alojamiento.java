package com.turismo.model.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    @OneToMany(mappedBy = "alojamiento", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("alojamiento-reservas") // Identificador único
    private List<Reserva> reservas;

    @OneToMany(mappedBy = "alojamiento", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("alojamiento-valoraciones") // Identificador único
    private List<Valoracion> valoraciones;
}

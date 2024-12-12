package com.turismo.model.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "restaurantes")
@Getter
@Setter
public class Restaurante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRestaurante;

    private String nombre;
    private String tipoComida;
    private String especialidad;
    private String ubicacion;
    private Double precioPromedio;
    private String horario;
    private Double puntuacion;
    private String imagen;

    // Relación con reservas: al eliminar un restaurante, eliminar sus reservas
    @OneToMany(mappedBy = "restaurante", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("restaurante-reservas")
    private List<Reserva> reservas;
}

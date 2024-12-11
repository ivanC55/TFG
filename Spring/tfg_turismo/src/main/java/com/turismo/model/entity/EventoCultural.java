package com.turismo.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "eventosCulturales")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EventoCultural {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEvento;

    private String nombre;
    @Column(columnDefinition = "TEXT")
    private String descripcion;
    private Date fecha_inicio;
    private Date fecha_fin;
    private String ubicacion;
    private Double precio_entrada;
    private String imagen;

}

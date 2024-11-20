package com.turismo.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "monumentosHistoricos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MonumentoHistorico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idMonumento;

    private String nombre;
    @Column(columnDefinition = "TEXT")
    private String historia;
    private String tipo;
    private String ubicacion;
    private String horario;
    private Double precio_entrada;
    private String imagen;

}

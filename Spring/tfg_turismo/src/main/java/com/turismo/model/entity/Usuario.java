package com.turismo.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String nombre;
    private String apellidos;
    private String password;
    private String email;
    private String telefono;
    private String direccion;
    @ManyToOne
    @JoinColumn(name = "role_id", referencedColumnName = "id")
    private Role rol;

}

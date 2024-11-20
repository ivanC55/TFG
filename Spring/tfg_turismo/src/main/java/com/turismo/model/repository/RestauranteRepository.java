package com.turismo.model.repository;

import com.turismo.model.entity.Restaurante;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RestauranteRepository extends JpaRepository<Restaurante, Long> {

    // Buscar un único restaurante por nombre
    Optional<Restaurante> findByNombre(String nombre);

    // Buscar múltiples restaurantes por tipo de comida
    List<Restaurante> findByTipoComida(String tipoComida);
}

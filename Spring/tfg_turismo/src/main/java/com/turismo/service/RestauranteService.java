package com.turismo.service;

import com.turismo.model.entity.MonumentoHistorico;
import com.turismo.model.entity.Restaurante;

import java.util.List;
import java.util.Optional;

public interface RestauranteService {
    Restaurante save(Restaurante restaurante);

    void delete(Long id);

    Restaurante getById(Long id);

    List<Restaurante> listAll();

    // Devolver un único restaurante por nombre
    Optional<Restaurante> findByNombre(String nombre);

    // Devolver múltiples restaurantes por tipo de comida
    List<Restaurante> findByTipoComida(String tipoComida);
}

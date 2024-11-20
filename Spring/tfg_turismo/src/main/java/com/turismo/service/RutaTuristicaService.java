package com.turismo.service;

import com.turismo.model.entity.RutaTuristica;

import java.util.List;
import java.util.Optional;

public interface RutaTuristicaService {
    RutaTuristica save(RutaTuristica rutaTuristica);
    void delete(Long id);
    RutaTuristica getById(Long id);
    List<RutaTuristica> listAll();

    Optional<RutaTuristica> findByNombre(String nombre);
    List<RutaTuristica> findByTipo(String tipo);
}

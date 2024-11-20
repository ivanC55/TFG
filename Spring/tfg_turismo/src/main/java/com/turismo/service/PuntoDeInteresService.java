package com.turismo.service;

import com.turismo.model.entity.PuntoDeInteres;

import java.util.List;
import java.util.Optional;

public interface PuntoDeInteresService {
    PuntoDeInteres save (PuntoDeInteres puntoDeInteres);
    void delete (Long id);
    PuntoDeInteres getById(Long id);
    List<PuntoDeInteres> listAll();

    // Devolver un único punto de interés por nombre
    Optional<PuntoDeInteres> findByNombre(String nombre);

    // Devolver múltiples puntos de interés por ruta
    List<PuntoDeInteres> findByRutaId(Long idRuta);

}

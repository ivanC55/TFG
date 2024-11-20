package com.turismo.model.repository;

import com.turismo.model.entity.PuntoDeInteres;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PuntoDeInteresRepository extends JpaRepository<PuntoDeInteres,Long> {

    // Buscar un único punto de interés por nombre
    Optional<PuntoDeInteres> findByNombre(String nombre);

    // Buscar múltiples puntos de interés asociados a una ruta
    List<PuntoDeInteres> findByRuta_IdRuta(Long idRuta);

}

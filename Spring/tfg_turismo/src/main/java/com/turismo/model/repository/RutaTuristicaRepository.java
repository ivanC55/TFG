package com.turismo.model.repository;

import com.turismo.model.entity.RutaTuristica;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RutaTuristicaRepository extends JpaRepository<RutaTuristica, Long> {
    Optional<RutaTuristica> findByNombre(String nombre);
    List<RutaTuristica> findByTipo(String tipo);
}

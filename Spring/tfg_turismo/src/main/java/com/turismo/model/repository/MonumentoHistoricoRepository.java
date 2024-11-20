package com.turismo.model.repository;

import com.turismo.model.entity.MonumentoHistorico;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MonumentoHistoricoRepository extends JpaRepository<MonumentoHistorico, Long> {
    Optional<MonumentoHistorico> findByNombre(String nombre);

    List<MonumentoHistorico> findByUbicacion(String ubicacion);

}

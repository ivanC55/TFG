package com.turismo.model.repository;

import com.turismo.model.entity.EventoCultural;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EventoCulturalRepository extends JpaRepository<EventoCultural, Long> {
    Optional<EventoCultural> findByNombre(String nombre);
    List<EventoCultural> findByUbicacion(String ubicacion);
}

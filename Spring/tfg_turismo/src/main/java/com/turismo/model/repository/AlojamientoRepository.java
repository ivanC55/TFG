package com.turismo.model.repository;

import com.turismo.model.entity.Alojamiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlojamientoRepository extends JpaRepository<Alojamiento, Long> {
    List<Alojamiento> findByTipo(String tipo);  // Buscar por tipo de alojamiento
    List<Alojamiento> findByUbicacion(String ubicacion);  // Buscar por ubicación
}
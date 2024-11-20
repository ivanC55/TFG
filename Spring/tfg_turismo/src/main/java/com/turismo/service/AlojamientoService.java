package com.turismo.service;

import com.turismo.model.entity.Alojamiento;

import java.util.List;


public interface AlojamientoService {
    Alojamiento save(Alojamiento alojamiento);
    void delete(Long id);
    Alojamiento getById(Long id);
    List<Alojamiento> listAll();
    List<Alojamiento> findByTipo(String tipo);  // Buscar alojamientos por tipo (ej. hotel, hostal, etc.)
    List<Alojamiento> findByUbicacion(String ubicacion);  // Buscar alojamientos por ubicación
}

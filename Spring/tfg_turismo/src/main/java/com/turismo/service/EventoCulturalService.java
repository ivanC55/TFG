package com.turismo.service;

import com.turismo.model.entity.EventoCultural;

import java.util.List;
import java.util.Optional;

public interface EventoCulturalService {
    EventoCultural save (EventoCultural eventoCultural);
    void delete (Long id);
    EventoCultural getById(Long id);
    List<EventoCultural> listAll();

    Optional<EventoCultural> getByNombre(String nombre);
    List<EventoCultural> getByUbicacion(String ubicacion);

}

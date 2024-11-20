package com.turismo.service.impl;

import com.turismo.model.entity.EventoCultural;
import com.turismo.model.repository.EventoCulturalRepository;
import com.turismo.service.EventoCulturalService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class EventoCulturalServiceImpl implements EventoCulturalService {

    private final EventoCulturalRepository eventoCulturalRepository;
    public EventoCulturalServiceImpl(EventoCulturalRepository eventoCulturalRepository) {
        this.eventoCulturalRepository = eventoCulturalRepository;
    }
    @Override
    public EventoCultural save(EventoCultural eventoCultural) {
        return eventoCulturalRepository.save(eventoCultural);
    }

    @Override
    public void delete(Long id) {
        eventoCulturalRepository.deleteById(id);
    }

    @Override
    public EventoCultural getById(Long id) {
        Optional<EventoCultural> eventoCultural = eventoCulturalRepository.findById(id);
        return eventoCultural.orElse(null);
    }

    @Override
    public List<EventoCultural> listAll() {
        return eventoCulturalRepository.findAll();
    }

    @Override
    public Optional<EventoCultural> getByNombre(String nombre) {
        return eventoCulturalRepository.findByNombre(nombre);
    }

    @Override
    public List<EventoCultural> getByUbicacion(String ubicacion) {
        return eventoCulturalRepository.findByUbicacion(ubicacion);
    }
}

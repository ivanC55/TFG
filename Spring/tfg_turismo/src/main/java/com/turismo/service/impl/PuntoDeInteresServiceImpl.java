package com.turismo.service.impl;

import com.turismo.model.entity.PuntoDeInteres;
import com.turismo.model.repository.PuntoDeInteresRepository;
import com.turismo.service.PuntoDeInteresService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PuntoDeInteresServiceImpl implements PuntoDeInteresService {
    private final PuntoDeInteresRepository puntoDeInteresRepository;
    public PuntoDeInteresServiceImpl(PuntoDeInteresRepository puntoDeInteresRepository){
        this.puntoDeInteresRepository = puntoDeInteresRepository;
    }
    @Override
    public PuntoDeInteres save(PuntoDeInteres puntoDeInteres) {
        return puntoDeInteresRepository.save(puntoDeInteres);
    }

    @Override
    public void delete(Long id) {
        puntoDeInteresRepository.deleteById(id);
    }

    @Override
    public PuntoDeInteres getById(Long id) {
        return puntoDeInteresRepository.findById(id).orElse(null);
    }

    @Override
    public List<PuntoDeInteres> listAll() {
        return puntoDeInteresRepository.findAll();
    }

    @Override
    public Optional<PuntoDeInteres> findByNombre(String nombre) {
        return puntoDeInteresRepository.findByNombre(nombre);
    }

    @Override
    public List<PuntoDeInteres> findByRutaId(Long idRuta) {
        return puntoDeInteresRepository.findByRuta_IdRuta(idRuta);
    }
}

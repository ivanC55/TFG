package com.turismo.service.impl;

import com.turismo.model.repository.AlojamientoRepository;
import com.turismo.model.entity.Alojamiento;
import com.turismo.service.AlojamientoService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlojamientoServiceImpl implements AlojamientoService {

    private final AlojamientoRepository alojamientoRepository;

    public AlojamientoServiceImpl(AlojamientoRepository alojamientoRepository) {
        this.alojamientoRepository = alojamientoRepository;
    }

    @Override
    public Alojamiento save(Alojamiento alojamiento) {
        return alojamientoRepository.save(alojamiento);
    }

    @Override
    public void delete(Long id) {
        alojamientoRepository.deleteById(id);
    }

    @Override
    public Alojamiento getById(Long id) {
        Optional<Alojamiento> alojamiento = alojamientoRepository.findById(id);
        return alojamiento.orElse(null);
    }

    @Override
    public List<Alojamiento> listAll() {
        return alojamientoRepository.findAll();
    }

    @Override
    public List<Alojamiento> findByTipo(String tipo) {
        return alojamientoRepository.findByTipo(tipo);
    }

    @Override
    public List<Alojamiento> findByUbicacion(String ubicacion) {
        return alojamientoRepository.findByUbicacion(ubicacion);
    }
}

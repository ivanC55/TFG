package com.turismo.service.impl;

import com.turismo.model.entity.RutaTuristica;
import com.turismo.model.repository.RutaTuristicaRepository;
import com.turismo.service.RutaTuristicaService;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Optional;

@Service
public class RutaTuristicaServiceImpl implements RutaTuristicaService {
    private final RutaTuristicaRepository rutaTuristicaRepository;
    public RutaTuristicaServiceImpl(RutaTuristicaRepository rutaTuristicaRepository){
        this.rutaTuristicaRepository = rutaTuristicaRepository;
    }
    @Override
    public RutaTuristica save(RutaTuristica rutaTuristica) {
        return rutaTuristicaRepository.save(rutaTuristica);
    }

    @Override
    public void delete(Long id) {
        rutaTuristicaRepository.deleteById(id);
    }

    @Override
    public RutaTuristica getById(Long id) {
        return rutaTuristicaRepository.findById(id).orElse(null);
    }

    @Override
    public List<RutaTuristica> listAll() {
        return rutaTuristicaRepository.findAll();
    }

    @Override
    public Optional<RutaTuristica> findByNombre(String nombre) {
        return rutaTuristicaRepository.findByNombre(nombre);
    }

    @Override
    public List<RutaTuristica> findByTipo(String tipo) {
        return rutaTuristicaRepository.findByTipo(tipo);
    }
}

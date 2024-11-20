package com.turismo.service.impl;

import com.turismo.model.entity.MonumentoHistorico;
import com.turismo.model.repository.MonumentoHistoricoRepository;
import com.turismo.service.MonumentoHistoricoService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MonumentoHistoricoServiceImpl implements MonumentoHistoricoService {

    private final MonumentoHistoricoRepository monumentoHistoricoRepository;

    public MonumentoHistoricoServiceImpl(MonumentoHistoricoRepository monumentoHistoricoRepository){
        this.monumentoHistoricoRepository = monumentoHistoricoRepository;
    }
    @Override
    public MonumentoHistorico save(MonumentoHistorico monumentoHistorico) {
        return monumentoHistoricoRepository.save(monumentoHistorico);
    }

    @Override
    public void delete(Long id) {
        monumentoHistoricoRepository.deleteById(id);
    }

    @Override
    public MonumentoHistorico getById(Long id) {
        return monumentoHistoricoRepository.findById(id).orElse(null);
    }

    @Override
    public List<MonumentoHistorico> listAll() {
        return monumentoHistoricoRepository.findAll();
    }

    @Override
    public Optional<MonumentoHistorico> findByNombre(String nombre) {
        return monumentoHistoricoRepository.findByNombre(nombre);
    }

    @Override
    public List<MonumentoHistorico> FindByUbicacion(String ubicacion) {
        return monumentoHistoricoRepository.findByUbicacion(ubicacion);
    }
}

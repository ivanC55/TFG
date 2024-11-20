package com.turismo.service;

import com.turismo.model.entity.EventoCultural;
import com.turismo.model.entity.MonumentoHistorico;

import java.util.List;
import java.util.Optional;

public interface MonumentoHistoricoService {
    MonumentoHistorico save (MonumentoHistorico monumentoHistorico);
    void delete (Long id);
    MonumentoHistorico getById(Long id);
    List<MonumentoHistorico> listAll();

    Optional<MonumentoHistorico> findByNombre(String nombre);
    List<MonumentoHistorico> FindByUbicacion(String ubicacion);
}

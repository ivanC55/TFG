package com.turismo.service;

import com.turismo.model.entity.Valoracion;

import java.util.List;

public interface ValoracionService {
    List<Valoracion> getAllValoraciones();
    List<Valoracion> getValoracionesByAlojamiento(Long alojamientoId);
    Valoracion saveValoracion(Long usuarioId, Long alojamientoId, Double puntuacion, String comentario);
    Valoracion updateValoracion(Long id, Double puntuacion, String comentario);
    void deleteValoracion(Long id);
}

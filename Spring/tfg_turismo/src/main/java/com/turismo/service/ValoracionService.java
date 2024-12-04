package com.turismo.service;

import com.turismo.model.entity.Valoracion;

import java.util.List;

public interface ValoracionService {

    Valoracion saveValoracion(Long usuarioId, Long alojamientoId, Double puntuacion, String comentario);

    List<Valoracion> getValoracionesByAlojamiento(Long alojamientoId);

    List<Valoracion> getValoracionesByUsuario(Long usuarioId);
}

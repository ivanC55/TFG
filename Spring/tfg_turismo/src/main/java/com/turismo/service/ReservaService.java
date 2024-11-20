package com.turismo.service;

import com.turismo.model.entity.MonumentoHistorico;
import com.turismo.model.entity.Reserva;

import java.util.List;

public interface ReservaService {
    Reserva save(Reserva reserva);
    void delete(Long id);
    Reserva getById(Long id);
    List<Reserva> listAll();
    List<Reserva> findByUsuario(Long idUsuario);  // Opcional para listar reservas de un usuario
    List<Reserva> findByAlojamiento(Long idAlojamiento);  // Opcional para listar reservas de un alojamiento
}


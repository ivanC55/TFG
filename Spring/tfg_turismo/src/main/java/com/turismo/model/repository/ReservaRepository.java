package com.turismo.model.repository;


import com.turismo.model.entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReservaRepository extends JpaRepository<Reserva, Long> {
        List<Reserva> findByUsuario_Id(Long idUsuario);
        List<Reserva> findByAlojamiento_IdAlojamiento(Long idAlojamiento);
        List<Reserva> findByRestaurante_IdRestaurante(Long idRestaurante);
    }


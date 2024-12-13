package com.turismo.service.impl;

import com.turismo.model.entity.Reserva;
import com.turismo.model.repository.ReservaRepository;
import com.turismo.service.ReservaService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservaServiceImpl implements ReservaService {

    private final ReservaRepository reservaRepository;

    public ReservaServiceImpl(ReservaRepository reservaRepository) {
        this.reservaRepository = reservaRepository;
    }

    @Override
    public Reserva save(Reserva reserva) {
        return reservaRepository.save(reserva);  // Guarda la reserva
    }

    @Override
    public void delete(Long id) {
        reservaRepository.deleteById(id);
    }

    @Override
    public Reserva getById(Long id) {
        Reserva reserva = reservaRepository.findById(id).orElse(null);
        if (reserva != null) {
            // Accede a las relaciones, pero solo si no son null
            if (reserva.getUsuario() != null) {
                reserva.getUsuario().getId(); // Fuerza la carga de usuario
            }
            if (reserva.getAlojamiento() != null) {
                reserva.getAlojamiento().getIdAlojamiento(); // Fuerza la carga de alojamiento
            }
            if (reserva.getRestaurante() != null) {
                reserva.getRestaurante().getIdRestaurante(); // Fuerza la carga de restaurante
            }
        }
        return reserva;
    }

    @Override
    public List<Reserva> listAll() {
        return reservaRepository.findAll();
    }

    @Override
    public List<Reserva> findByUsuario(Long idUsuario) {
        return reservaRepository.findByUsuario_Id(idUsuario);
    }

    @Override
    public List<Reserva> findByAlojamiento(Long idAlojamiento) {
        return reservaRepository.findByAlojamiento_IdAlojamiento(idAlojamiento);
    }
}

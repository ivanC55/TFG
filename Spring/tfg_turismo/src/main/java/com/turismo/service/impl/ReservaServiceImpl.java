package com.turismo.service.impl;

import com.turismo.model.entity.Reserva;
import com.turismo.model.repository.ReservaRepository;
import com.turismo.service.ReservaService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservaServiceImpl implements ReservaService {

    private final ReservaRepository reservaRepository;

    public ReservaServiceImpl(ReservaRepository reservaRepository) {
        this.reservaRepository = reservaRepository;
    }

    @Override
    public Reserva save(Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    @Override
    public void delete(Long id) {
        reservaRepository.deleteById(id);
    }

    @Override
    public Reserva getById(Long id) {
        Optional<Reserva> reserva = reservaRepository.findById(id);
        return reserva.orElse(null);
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


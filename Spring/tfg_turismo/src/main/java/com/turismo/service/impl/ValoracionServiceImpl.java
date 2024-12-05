package com.turismo.service.impl;

import com.turismo.model.entity.Alojamiento;
import com.turismo.model.entity.Usuario;
import com.turismo.model.entity.Valoracion;
import com.turismo.model.repository.AlojamientoRepository;
import com.turismo.model.repository.UsuarioRepository;
import com.turismo.model.repository.ValoracionRepository;
import com.turismo.service.ValoracionService;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;
@Service
public class ValoracionServiceImpl implements ValoracionService {

    private final ValoracionRepository valoracionRepository;

    public ValoracionServiceImpl(ValoracionRepository valoracionRepository) {
        this.valoracionRepository = valoracionRepository;
    }

    @Override
    public List<Valoracion> getAllValoraciones() {
        return valoracionRepository.findAll();
    }

    @Override
    public List<Valoracion> getValoracionesByAlojamiento(Long alojamientoId) {
        Alojamiento alojamiento = new Alojamiento();
        alojamiento.setIdAlojamiento(alojamientoId);
        return valoracionRepository.findByAlojamiento(alojamiento);
    }


    @Override
    public Valoracion saveValoracion(Long usuarioId, Long alojamientoId, Double puntuacion, String comentario) {
        Usuario usuario = new Usuario();
        usuario.setId(usuarioId);
        Alojamiento alojamiento = new Alojamiento();
        alojamiento.setIdAlojamiento(alojamientoId);

        Valoracion valoracion = new Valoracion();
        valoracion.setUsuario(usuario);
        valoracion.setAlojamiento(alojamiento);
        valoracion.setPuntuacion(puntuacion);
        valoracion.setComentario(comentario);

        return valoracionRepository.save(valoracion);
    }

    @Override
    public Valoracion updateValoracion(Long id, Double puntuacion, String comentario) {
        Optional<Valoracion> valoracionOpt = valoracionRepository.findById(id);
        if (valoracionOpt.isPresent()) {
            Valoracion valoracion = valoracionOpt.get();
            valoracion.setPuntuacion(puntuacion);
            valoracion.setComentario(comentario);
            return valoracionRepository.save(valoracion);
        }
        return null;
    }

    @Override
    public void deleteValoracion(Long id) {
        valoracionRepository.deleteById(id);
    }
}
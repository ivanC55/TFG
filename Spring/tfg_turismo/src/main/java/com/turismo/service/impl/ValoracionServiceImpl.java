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
        private final UsuarioRepository usuarioRepository;
        private final AlojamientoRepository alojamientoRepository;

        public ValoracionServiceImpl(ValoracionRepository valoracionRepository,
                                     UsuarioRepository usuarioRepository,
                                     AlojamientoRepository alojamientoRepository) {
            this.valoracionRepository = valoracionRepository;
            this.usuarioRepository = usuarioRepository;
            this.alojamientoRepository = alojamientoRepository;
        }

        @Override
        public Valoracion saveValoracion(Long usuarioId, Long alojamientoId, Double puntuacion, String comentario) {
            Assert.notNull(usuarioId, "El ID de usuario no debe ser nulo");
            Assert.notNull(alojamientoId, "El ID de alojamiento no debe ser nulo");

            Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
            Alojamiento alojamiento = alojamientoRepository.findById(alojamientoId).orElseThrow(() -> new IllegalArgumentException("Alojamiento no encontrado"));

            Valoracion valoracion = new Valoracion();
            valoracion.setUsuario(usuario);
            valoracion.setAlojamiento(alojamiento);
            valoracion.setPuntuacion(puntuacion);
            valoracion.setComentario(comentario);

            return valoracionRepository.save(valoracion);
        }

        @Override
        public List<Valoracion> getValoracionesByAlojamiento(Long alojamientoId) {
            Optional<Alojamiento> alojamiento = alojamientoRepository.findById(alojamientoId);
            if (alojamiento.isEmpty()) {
                throw new IllegalArgumentException("Alojamiento no encontrado");
            }

            return valoracionRepository.findByAlojamiento(alojamiento.get());
        }

        @Override
        public List<Valoracion> getValoracionesByUsuario(Long usuarioId) {
            Optional<Usuario> usuario = usuarioRepository.findById(usuarioId);
            if (usuario.isEmpty()) {
                throw new IllegalArgumentException("Usuario no encontrado");
            }

            return valoracionRepository.findByUsuario(usuario.get());
        }
    }
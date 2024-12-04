package com.turismo.model.repository;

import com.turismo.model.entity.Alojamiento;
import com.turismo.model.entity.Usuario;
import com.turismo.model.entity.Valoracion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ValoracionRepository extends JpaRepository<Valoracion, Long> {
    List<Valoracion> findByAlojamiento(Alojamiento alojamiento);
    List<Valoracion> findByUsuario(Usuario usuario);
}

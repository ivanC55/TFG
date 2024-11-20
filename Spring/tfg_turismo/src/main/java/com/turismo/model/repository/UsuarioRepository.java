package com.turismo.model.repository;

import com.turismo.model.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario,Long> {
    public Usuario findByUsername(String username);

}

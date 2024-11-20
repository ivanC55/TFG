package com.turismo.service;

import com.turismo.model.entity.Usuario;

import java.util.List;

public interface UsuarioService {

    Usuario save(Usuario usuario);

    Usuario getById(Long id);

    void delete(Long id);

    List<Usuario> listAll();

}

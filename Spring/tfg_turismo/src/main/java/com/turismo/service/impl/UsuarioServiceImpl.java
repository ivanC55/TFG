package com.turismo.service.impl;

import com.turismo.model.entity.Usuario;
import com.turismo.model.repository.UsuarioRepository;
import com.turismo.service.UsuarioService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public Usuario save(Usuario usuario) {
        if (!usuario.getPassword().startsWith("$2a$")) { // Evita cifrar una contraseña ya cifrada
            usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        }
        return usuarioRepository.save(usuario);
    }
    @Override
    public Usuario getById(Long id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(Long id) {
        usuarioRepository.deleteById(id);
    }

    @Override
    public List<Usuario> listAll() {
        return usuarioRepository.findAll();
    }

    @PostConstruct
    public void encodePasswords() {
        usuarioRepository.findAll().forEach(usuario -> {
            if (!usuario.getPassword().startsWith("$2a$")) { // Evita cifrar contraseñas ya cifradas
                usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
                usuarioRepository.save(usuario);
            }
        });
    }
}

package com.turismo.service.impl;

import com.turismo.model.entity.Role;
import com.turismo.model.entity.Usuario;
import com.turismo.model.repository.RoleRepository;
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
    private final RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository, RoleRepository roleRepository) {
        this.usuarioRepository = usuarioRepository;
        this.roleRepository = roleRepository;
    }

    public Usuario save(Usuario usuario) {
        // Primero, obtén el rol desde la base de datos usando el id enviado en el JSON
        if (usuario.getRol() != null && usuario.getRol().getId() != null) {
            Role rol = roleRepository.findById(usuario.getRol().getId())
                    .orElseThrow(() -> new RuntimeException("Role not found"));

            // Asigna el rol al usuario
            usuario.setRol(rol);
        }

        // Luego guarda el usuario
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
            if (!usuario.getPassword().startsWith("$2a$")) {
                usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
                usuarioRepository.save(usuario);
            }
        });
    }

    @Override
    public Usuario findByUsername(String username) {
        return usuarioRepository.findByUsername(username).orElse(null);
    }

    @Override
    public Usuario updateRole(Long id, String rolName) {
        // Busca el rol por nombre
        Role role = roleRepository.findByName(rolName).orElse(null);
        if (role != null) {
            Usuario usuario = usuarioRepository.findById(id).orElse(null);
            if (usuario != null) {
                usuario.setRol(role);
                return usuarioRepository.save(usuario);
            }
        }
        return null;
    }
}

package com.turismo.auth.controller;

import com.turismo.auth.model.JwtAuthenticationResponse;
import com.turismo.auth.model.LoginRequest;
import com.turismo.auth.service.JwtTokenProvider;
import com.turismo.model.entity.Usuario;
import com.turismo.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        try {
            String username = loginRequest.get("username");
            String password = loginRequest.get("password");

            System.out.println("Intentando autenticar usuario: " + username);

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );

            System.out.println("Autenticación exitosa para usuario: " + username);

            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Generar el token
            String token = jwtTokenProvider.generateToken(authentication);
            System.out.println("Token generado: " + token);

            return ResponseEntity.ok(Map.of("token", token));
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(401).body("Usuario o contraseña incorrectos");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario usuario) {
        try {
            String rawPassword = usuario.getPassword();

            usuario.setPassword(passwordEncoder.encode(rawPassword));

            Usuario savedUser = usuarioService.save(usuario);

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(usuario.getUsername(), rawPassword)
            );

            String token = jwtTokenProvider.generateToken(authentication);

            return ResponseEntity.ok(Map.of("token", token));
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(500).body("Error al registrar el usuario");
        }
    }

    @GetMapping("/usuario")
    public ResponseEntity<?> getUsuarioLogueado() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (authentication == null || authentication.getPrincipal().equals("anonymousUser")) {
                return ResponseEntity.status(401).body("Usuario no autenticado");
            }

            String username = authentication.getName();

            Usuario usuario = usuarioService.findByUsername(username);
            if (usuario == null) {
                return ResponseEntity.status(404).body("Usuario no encontrado");
            }

            return ResponseEntity.ok(usuario);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error al obtener el usuario logueado");
        }
    }




}

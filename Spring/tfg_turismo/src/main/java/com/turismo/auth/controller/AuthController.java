package com.turismo.auth.controller;

import com.turismo.auth.model.JwtAuthenticationResponse;
import com.turismo.auth.model.LoginRequest;
import com.turismo.auth.service.JwtTokenProvider;
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

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        try {
            String username = loginRequest.get("username");
            String password = loginRequest.get("password");

            System.out.println("Intentando autenticar usuario: " + username); // Log para depurar

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );

            System.out.println("Autenticación exitosa para usuario: " + username);

            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Generar el token
            String token = jwtTokenProvider.generateToken(authentication);
            System.out.println("Token generado: " + token); // Log para confirmar generación de token

            return ResponseEntity.ok(Map.of("token", token));
        } catch (Exception ex) {
            ex.printStackTrace(); // Log para detectar excepciones
            return ResponseEntity.status(401).body("Usuario o contraseña incorrectos");
        }
    }



}

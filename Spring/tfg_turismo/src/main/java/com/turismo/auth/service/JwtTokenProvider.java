package com.turismo.auth.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    private String secretKey = "misecreto2516UltraSecreto654651wehfsdjkfsnsjfsfsdf54s5d4fsdSDFSDFSDFS54sf5sDFSdf5s4dfFSFs54f5s4df1s54dfs54dfsd5f4dfskjfksfdhsjkfddnssfsdf54sf64df564f5df4gdfg4445fdg";
    private long validityInMilliseconds = 3600000; // 1 hora

    public String generateToken(Authentication authentication) {
        String username = authentication.getName();
        System.out.println("Generando token para usuario: " + username); // Log
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + validityInMilliseconds);

        // Generar el token JWT
        String token = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();

        // Asegurarse de que el token sea URL-safe (en caso de que haya algún problema)
        return Base64.getUrlEncoder().encodeToString(token.getBytes());
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
        String username = claims.getSubject();

        // Cargar el usuario desde la base de datos usando el UserDetailsService
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

        // Retornar un AuthenticationToken con el UserDetails
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }
}

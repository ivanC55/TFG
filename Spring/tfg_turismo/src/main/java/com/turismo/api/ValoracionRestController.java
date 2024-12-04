package com.turismo.api;

import com.turismo.service.ValoracionService;
import com.turismo.model.entity.Valoracion;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/valoraciones")
public class ValoracionRestController {

    private final ValoracionService valoracionService;

    public ValoracionRestController(ValoracionService valoracionService) {
        this.valoracionService = valoracionService;
    }

    // Crear una valoración
    @PostMapping
    public ResponseEntity<Valoracion> crearValoracion(@RequestBody Valoracion valoracion) {
        Valoracion nuevaValoracion = valoracionService.saveValoracion(
                valoracion.getUsuario().getId(),
                valoracion.getAlojamiento().getIdAlojamiento(),
                valoracion.getPuntuacion(),
                valoracion.getComentario()
        );
        return new ResponseEntity<>(nuevaValoracion, HttpStatus.CREATED);
    }

    @GetMapping("/alojamiento/{alojamientoId}")
    public ResponseEntity<List<Valoracion>> obtenerValoraciones(@PathVariable Long alojamientoId) {
        List<Valoracion> valoraciones = valoracionService.getValoracionesByAlojamiento(alojamientoId);
        return new ResponseEntity<>(valoraciones, HttpStatus.OK);
    }
}

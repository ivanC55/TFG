package com.turismo.api;

import com.turismo.service.ValoracionService;
import com.turismo.model.entity.Valoracion;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/valoraciones")
@CrossOrigin(origins = "http://localhost:4200")
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

    // Obtener todas las valoraciones
    @GetMapping
    public ResponseEntity<List<Valoracion>> obtenerTodasValoraciones() {
        List<Valoracion> valoraciones = valoracionService.getAllValoraciones();
        return new ResponseEntity<>(valoraciones, HttpStatus.OK);
    }

    // Obtener valoraciones por alojamiento
    @GetMapping("/alojamiento/{alojamientoId}")
    public ResponseEntity<List<Valoracion>> obtenerValoraciones(@PathVariable Long alojamientoId) {
        List<Valoracion> valoraciones = valoracionService.getValoracionesByAlojamiento(alojamientoId);
        return new ResponseEntity<>(valoraciones, HttpStatus.OK);
    }

    // Actualizar una valoración
    @PutMapping("/{id}")
    public ResponseEntity<Valoracion> actualizarValoracion(@PathVariable Long id, @RequestBody Valoracion valoracion) {
        Valoracion valoracionActualizada = valoracionService.updateValoracion(
                id,
                valoracion.getPuntuacion(),
                valoracion.getComentario()
        );
        return new ResponseEntity<>(valoracionActualizada, HttpStatus.OK);
    }

    // Eliminar una valoración
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarValoracion(@PathVariable Long id) {
        valoracionService.deleteValoracion(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

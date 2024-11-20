package com.turismo.api;

import com.turismo.model.entity.Alojamiento;
import com.turismo.service.AlojamientoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alojamientos")
@CrossOrigin(origins = "http://localhost:4200")
public class AlojamientoRestController {
    private final AlojamientoService alojamientoService;

    @Autowired
    public AlojamientoRestController(AlojamientoService alojamientoService) {
        this.alojamientoService = alojamientoService;
    }

    // Todos
    @GetMapping
    public ResponseEntity<List<Alojamiento>> getAllAlojamientos() {
        List<Alojamiento> alojamientos = alojamientoService.listAll();
        return ResponseEntity.ok(alojamientos);
    }

    // Obtener por id
    @GetMapping("/{id}")
    public ResponseEntity<Alojamiento> getAlojamientoById(@PathVariable Long id) {
        Alojamiento alojamiento = alojamientoService.getById(id);
        return alojamiento != null ? ResponseEntity.ok(alojamiento) : ResponseEntity.notFound().build();
    }

    // Crear alojamiento
    @PostMapping
    public ResponseEntity<Alojamiento> createAlojamiento(@RequestBody Alojamiento alojamiento) {
        Alojamiento newAlojamiento = alojamientoService.save(alojamiento);
        return ResponseEntity.ok(newAlojamiento);
    }

    // Actualizar alojamiento
    @PutMapping("/{id}")
    public ResponseEntity<Alojamiento> updateAlojamiento(@PathVariable Long id, @RequestBody Alojamiento alojamientoDetails) {
        Alojamiento alojamiento = alojamientoService.getById(id);
        if (alojamiento == null) {
            return ResponseEntity.notFound().build();
        }

        alojamiento.setNombre(alojamientoDetails.getNombre());
        alojamiento.setTipo(alojamientoDetails.getTipo());
        alojamiento.setUbicacion(alojamientoDetails.getUbicacion());
        alojamiento.setPrecioNoche(alojamientoDetails.getPrecioNoche());
        alojamiento.setServicios(alojamientoDetails.getServicios());
        alojamiento.setPuntuacion(alojamientoDetails.getPuntuacion());

        Alojamiento updatedAlojamiento = alojamientoService.save(alojamiento);
        return ResponseEntity.ok(updatedAlojamiento);
    }

    // Eliminar alojamiento
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlojamiento(@PathVariable Long id) {
        Alojamiento alojamiento = alojamientoService.getById(id);
        if (alojamiento == null) {
            return ResponseEntity.notFound().build();
        }
        alojamientoService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Buscar alojamientos por tipo
    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<Alojamiento>> getAlojamientosByTipo(@PathVariable String tipo) {
        List<Alojamiento> alojamientos = alojamientoService.findByTipo(tipo);
        return ResponseEntity.ok(alojamientos);
    }
}

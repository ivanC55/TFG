package com.turismo.api;

import com.turismo.model.entity.PuntoDeInteres;
import com.turismo.service.PuntoDeInteresService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/puntos-de-interes")
@CrossOrigin(origins = "http://localhost:4200")
public class PuntoDeInteresRestController {

    private final PuntoDeInteresService puntoDeInteresService;

    @Autowired
    public PuntoDeInteresRestController(PuntoDeInteresService puntoDeInteresService) {
        this.puntoDeInteresService = puntoDeInteresService;
    }

    // Obtener todos los puntos de interés
    @GetMapping
    public ResponseEntity<List<PuntoDeInteres>> getAllPuntosDeInteres() {
        List<PuntoDeInteres> puntos = puntoDeInteresService.listAll();
        return ResponseEntity.ok(puntos);
    }

    // Obtener punto de interés por id
    @GetMapping("/{id}")
    public ResponseEntity<PuntoDeInteres> getPuntoDeInteresById(@PathVariable Long id) {
        PuntoDeInteres punto = puntoDeInteresService.getById(id);
        return punto != null ? ResponseEntity.ok(punto) : ResponseEntity.notFound().build();
    }

    // Crear un nuevo punto de interés
    @PostMapping
    public ResponseEntity<PuntoDeInteres> createPuntoDeInteres(@RequestBody PuntoDeInteres puntoDeInteres) {
        PuntoDeInteres newPunto = puntoDeInteresService.save(puntoDeInteres);
        return ResponseEntity.ok(newPunto);
    }

    // Actualizar un punto de interés existente
    @PutMapping("/{id}")
    public ResponseEntity<PuntoDeInteres> updatePuntoDeInteres(@PathVariable Long id, @RequestBody PuntoDeInteres puntoDetails) {
        PuntoDeInteres punto = puntoDeInteresService.getById(id);
        if (punto == null) {
            return ResponseEntity.notFound().build();
        }

        // Actualizar los campos del punto de interés
        punto.setNombre(puntoDetails.getNombre());
        punto.setDescripcion(puntoDetails.getDescripcion());
        punto.setCoordenadas(puntoDetails.getCoordenadas());
        punto.setOrden(puntoDetails.getOrden());
        punto.setRuta(puntoDetails.getRuta());

        PuntoDeInteres updatedPunto = puntoDeInteresService.save(punto);
        return ResponseEntity.ok(updatedPunto);
    }

    // Eliminar un punto de interés
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePuntoDeInteres(@PathVariable Long id) {
        PuntoDeInteres punto = puntoDeInteresService.getById(id);
        if (punto == null) {
            return ResponseEntity.notFound().build();
        }
        puntoDeInteresService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Buscar puntos de interés por nombre
    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<PuntoDeInteres> getPuntoDeInteresByNombre(@PathVariable String nombre) {
        PuntoDeInteres punto = puntoDeInteresService.findByNombre(nombre).orElse(null);
        return punto != null ? ResponseEntity.ok(punto) : ResponseEntity.notFound().build();
    }

    // Buscar puntos de interés por ID de ruta
    @GetMapping("/ruta/{idRuta}")
    public ResponseEntity<List<PuntoDeInteres>> getPuntosDeInteresByRutaId(@PathVariable Long idRuta) {
        List<PuntoDeInteres> puntos = puntoDeInteresService.findByRutaId(idRuta);
        return ResponseEntity.ok(puntos);
    }
}

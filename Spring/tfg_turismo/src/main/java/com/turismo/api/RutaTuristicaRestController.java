package com.turismo.api;

import com.turismo.model.entity.RutaTuristica;
import com.turismo.service.RutaTuristicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rutas-turisticas")
@CrossOrigin(origins = "http://localhost:4200")
public class RutaTuristicaRestController {

    private final RutaTuristicaService rutaTuristicaService;

    @Autowired
    public RutaTuristicaRestController(RutaTuristicaService rutaTuristicaService) {
        this.rutaTuristicaService = rutaTuristicaService;
    }

    // Obtener todas las rutas turísticas
    @GetMapping
    public ResponseEntity<List<RutaTuristica>> getAllRutasTuristicas() {
        List<RutaTuristica> rutas = rutaTuristicaService.listAll();
        return ResponseEntity.ok(rutas);
    }

    // Obtener una ruta turística por id
    @GetMapping("/{id}")
    public ResponseEntity<RutaTuristica> getRutaTuristicaById(@PathVariable Long id) {
        RutaTuristica ruta = rutaTuristicaService.getById(id);
        return ruta != null ? ResponseEntity.ok(ruta) : ResponseEntity.notFound().build();
    }

    // Crear una nueva ruta turística
    @PostMapping
    public ResponseEntity<RutaTuristica> createRutaTuristica(@RequestBody RutaTuristica rutaTuristica) {
        RutaTuristica newRuta = rutaTuristicaService.save(rutaTuristica);
        return ResponseEntity.ok(newRuta);
    }

    // Actualizar una ruta turística existente
    @PutMapping("/{id}")
    public ResponseEntity<RutaTuristica> updateRutaTuristica(@PathVariable Long id, @RequestBody RutaTuristica rutaDetails) {
        RutaTuristica ruta = rutaTuristicaService.getById(id);
        if (ruta == null) {
            return ResponseEntity.notFound().build();
        }

        // Actualizar los campos de la ruta
        ruta.setNombre(rutaDetails.getNombre());
        ruta.setTipo(rutaDetails.getTipo());
        ruta.setDescripcion(rutaDetails.getDescripcion());
        ruta.setDuracionEstimada(rutaDetails.getDuracionEstimada());
        ruta.setPuntosInteres(rutaDetails.getPuntosInteres());
        ruta.setMapaRuta(rutaDetails.getMapaRuta());

        RutaTuristica updatedRuta = rutaTuristicaService.save(ruta);
        return ResponseEntity.ok(updatedRuta);
    }

    // Eliminar una ruta turística
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRutaTuristica(@PathVariable Long id) {
        RutaTuristica ruta = rutaTuristicaService.getById(id);
        if (ruta == null) {
            return ResponseEntity.notFound().build();
        }
        rutaTuristicaService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Buscar rutas turísticas por nombre
    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<RutaTuristica> getRutaTuristicaByNombre(@PathVariable String nombre) {
        Optional<RutaTuristica> ruta = rutaTuristicaService.findByNombre(nombre);
        return ruta.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Buscar rutas turísticas por tipo
    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<RutaTuristica>> getRutasTuristicasByTipo(@PathVariable String tipo) {
        List<RutaTuristica> rutas = rutaTuristicaService.findByTipo(tipo);
        return ResponseEntity.ok(rutas);
    }
}

package com.turismo.api;

import com.turismo.model.entity.Restaurante;
import com.turismo.service.RestauranteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/restaurantes")
@CrossOrigin(origins = "http://localhost:4200")
public class RestauranteRestController {

    private final RestauranteService restauranteService;

    @Autowired
    public RestauranteRestController(RestauranteService restauranteService) {
        this.restauranteService = restauranteService;
    }

    // Obtener todos los restaurantes
    @GetMapping
    public ResponseEntity<List<Restaurante>> getAllRestaurantes() {
        List<Restaurante> restaurantes = restauranteService.listAll();
        return ResponseEntity.ok(restaurantes);
    }

    // Obtener un restaurante por id
    @GetMapping("/{id}")
    public ResponseEntity<Restaurante> getRestauranteById(@PathVariable Long id) {
        Restaurante restaurante = restauranteService.getById(id);
        return restaurante != null ? ResponseEntity.ok(restaurante) : ResponseEntity.notFound().build();
    }

    // Crear un nuevo restaurante
    @PostMapping
    public ResponseEntity<Restaurante> createRestaurante(@RequestBody Restaurante restaurante) {
        Restaurante newRestaurante = restauranteService.save(restaurante);
        return ResponseEntity.ok(newRestaurante);
    }

    // Actualizar un restaurante existente
    @PutMapping("/{id}")
    public ResponseEntity<Restaurante> updateRestaurante(@PathVariable Long id, @RequestBody Restaurante restauranteDetails) {
        Restaurante restaurante = restauranteService.getById(id);
        if (restaurante == null) {
            return ResponseEntity.notFound().build();
        }

        // Actualizar los campos del restaurante
        restaurante.setNombre(restauranteDetails.getNombre());
        restaurante.setTipoComida(restauranteDetails.getTipoComida());
        restaurante.setEspecialidad(restauranteDetails.getEspecialidad());
        restaurante.setUbicacion(restauranteDetails.getUbicacion());
        restaurante.setPrecioPromedio(restauranteDetails.getPrecioPromedio());
        restaurante.setHorario(restauranteDetails.getHorario());
        restaurante.setPuntuacion(restauranteDetails.getPuntuacion());

        Restaurante updatedRestaurante = restauranteService.save(restaurante);
        return ResponseEntity.ok(updatedRestaurante);
    }

    // Eliminar un restaurante
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRestaurante(@PathVariable Long id) {
        Restaurante restaurante = restauranteService.getById(id);
        if (restaurante == null) {
            return ResponseEntity.notFound().build();
        }
        restauranteService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Buscar restaurantes por nombre
    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<Restaurante> getRestauranteByNombre(@PathVariable String nombre) {
        Optional<Restaurante> restaurante = restauranteService.findByNombre(nombre);
        return restaurante.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Buscar restaurantes por tipo de comida
    @GetMapping("/tipoComida/{tipoComida}")
    public ResponseEntity<List<Restaurante>> getRestaurantesByTipoComida(@PathVariable String tipoComida) {
        List<Restaurante> restaurantes = restauranteService.findByTipoComida(tipoComida);
        return ResponseEntity.ok(restaurantes);
    }
}
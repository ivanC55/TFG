package com.turismo.api;

import com.turismo.model.entity.Alojamiento;
import com.turismo.model.entity.Restaurante;
import com.turismo.service.RestauranteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/restaurantes")
@CrossOrigin(origins = "http://localhost:4200")
public class RestauranteRestController {

    private final RestauranteService restauranteService;
    private final String UPLOAD_DIR = "src/main/resources/static/uploads/restaurantes/";


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

    @PostMapping("/upload/{id}")
    public ResponseEntity<?> uploadImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            Restaurante restaurante = restauranteService.getById(id);
            if (restaurante == null) {
                return ResponseEntity.status(404).body("{\"error\": \"Restaurante no encontrado\"}");
            }

            // Guardar archivo
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            restaurante.setImagen(fileName);
            restauranteService.save(restaurante);

            return ResponseEntity.ok("{\"message\": \"Imagen subida exitosamente\", \"fileName\": \"" + fileName + "\"}");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("{\"error\": \"Error al subir la imagen\"}");
        }
    }


    @GetMapping("/uploads/restaurantes/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            // Obtener la ruta de la imagen
            Path path = Paths.get(UPLOAD_DIR + filename);
            Resource resource = new UrlResource(path.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, "image/jpeg")
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
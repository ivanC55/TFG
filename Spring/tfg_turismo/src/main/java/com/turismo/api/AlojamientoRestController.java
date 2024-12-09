package com.turismo.api;

import com.turismo.model.entity.Alojamiento;
import com.turismo.service.AlojamientoService;
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
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/alojamientos")
@CrossOrigin(origins = "http://localhost:4200")
public class AlojamientoRestController {
    private final AlojamientoService alojamientoService;
    private final String UPLOAD_DIR = "src/main/resources/static/uploads/alojamientos/";

    private static final List<String> SERVICIOS_PERMITIDOS = Arrays.asList(
            "WiFi", "Piscina", "Aparcamiento gratuito", "Desayuno incluido", "Gimnasio"
    );

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
        // Validar los servicios seleccionados
        List<String> serviciosInvalidos = alojamiento.getServicios().stream()
                .filter(servicio -> !SERVICIOS_PERMITIDOS.contains(servicio))
                .collect(Collectors.toList());

        if (!serviciosInvalidos.isEmpty()) {
            return ResponseEntity.badRequest().body(null); // Retorna un error si hay servicios no permitidos
        }

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

        // Validar los servicios seleccionados
        List<String> serviciosInvalidos = alojamientoDetails.getServicios().stream()
                .filter(servicio -> !SERVICIOS_PERMITIDOS.contains(servicio))
                .collect(Collectors.toList());

        if (!serviciosInvalidos.isEmpty()) {
            return ResponseEntity.badRequest().body(null); // Retorna un error si hay servicios no permitidos
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

    @PostMapping("/upload/{id}")
    public ResponseEntity<?> uploadImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            // Validar alojamiento
            Alojamiento alojamiento = alojamientoService.getById(id);
            if (alojamiento == null) {
                return ResponseEntity.status(404).body("{\"error\": \"Alojamiento no encontrado\"}");
            }

            // Guardar archivo
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            // Actualizar referencia de imagen en el alojamiento
            alojamiento.setImagen(fileName);
            alojamientoService.save(alojamiento);

            return ResponseEntity.ok("{\"message\": \"Imagen subida exitosamente\", \"fileName\": \"" + fileName + "\"}");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("{\"error\": \"Error al subir la imagen\"}");
        }
    }

    // Endpoint para obtener la imagen
    @GetMapping("/uploads/alojamientos/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
            // Obtener la ruta de la imagen
            Path path = Paths.get(UPLOAD_DIR + filename);
            Resource resource = new UrlResource(path.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_TYPE, "image/jpeg") // o el tipo adecuado
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

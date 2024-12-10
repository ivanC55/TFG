package com.turismo.api;

import com.turismo.model.entity.PuntoDeInteres;
import com.turismo.model.entity.Restaurante;
import com.turismo.service.PuntoDeInteresService;
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

@RestController
@RequestMapping("/api/puntos-de-interes")
@CrossOrigin(origins = "http://localhost:4200")
public class PuntoDeInteresRestController {

    private final PuntoDeInteresService puntoDeInteresService;
    private final String UPLOAD_DIR = "src/main/resources/static/uploads/puntos-interes/";


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

    @PostMapping("/upload/{id}")
    public ResponseEntity<?> uploadImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            PuntoDeInteres puntoDeInteres = puntoDeInteresService.getById(id);
            if (puntoDeInteres == null) {
                return ResponseEntity.status(404).body("{\"error\": \"Punto de interés no encontrado\"}");
            }

            // Guardar archivo
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            puntoDeInteres.setImagen(fileName);
            puntoDeInteresService.save(puntoDeInteres);

            return ResponseEntity.ok("{\"message\": \"Imagen subida exitosamente\", \"fileName\": \"" + fileName + "\"}");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("{\"error\": \"Error al subir la imagen\"}");
        }
    }


    @GetMapping("/uploads/puntos-interes/{filename}")
    public ResponseEntity<Resource> getImage(@PathVariable String filename) {
        try {
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

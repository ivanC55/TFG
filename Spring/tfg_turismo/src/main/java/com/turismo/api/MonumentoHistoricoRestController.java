package com.turismo.api;

import com.turismo.model.entity.MonumentoHistorico;
import com.turismo.service.MonumentoHistoricoService;
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
@RequestMapping("/api/monumentos")
@CrossOrigin(origins = "http://localhost:4200")
public class MonumentoHistoricoRestController {

    private final MonumentoHistoricoService monumentoHistoricoService;
    private final String UPLOAD_DIR = "src/main/resources/static/uploads/monumentos/";

    @Autowired
    public MonumentoHistoricoRestController(MonumentoHistoricoService monumentoHistoricoService) {
        this.monumentoHistoricoService = monumentoHistoricoService;
    }

    @PostMapping("/upload/{id}")
    public ResponseEntity<?> uploadImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            // Validar monumento
            MonumentoHistorico monumento = monumentoHistoricoService.getById(id);
            if (monumento == null) {
                return ResponseEntity.status(404).body("{\"error\": \"Monumento no encontrado\"}");
            }

            // Guardar archivo
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            // Actualizar referencia de imagen en el monumento
            monumento.setImagen(fileName);
            monumentoHistoricoService.save(monumento);

            // Devolver JSON como respuesta
            return ResponseEntity.ok("{\"message\": \"Imagen subida exitosamente\", \"fileName\": \"" + fileName + "\"}");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("{\"error\": \"Error al subir la imagen\"}");
        }
    }

    @GetMapping("/uploads/monumentos/{filename}")
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


    @GetMapping
    public ResponseEntity<List<MonumentoHistorico>> getAllMonumentosHistoricos() {
        List<MonumentoHistorico> monumentos = monumentoHistoricoService.listAll();
        return ResponseEntity.ok(monumentos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MonumentoHistorico> getMonumentoHistoricoById(@PathVariable Long id) {
        MonumentoHistorico monumento = monumentoHistoricoService.getById(id);
        return monumento != null ? ResponseEntity.ok(monumento) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<MonumentoHistorico> createMonumentoHistorico(@RequestBody MonumentoHistorico monumentoHistorico) {
        MonumentoHistorico newMonumento = monumentoHistoricoService.save(monumentoHistorico);
        return ResponseEntity.ok(newMonumento);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MonumentoHistorico> updateMonumentoHistorico(@PathVariable Long id, @RequestBody MonumentoHistorico monumentoDetails) {
        MonumentoHistorico monumento = monumentoHistoricoService.getById(id);
        if (monumento == null) {
            return ResponseEntity.notFound().build();
        }

        // Actualizar los campos del monumento
        monumento.setNombre(monumentoDetails.getNombre());
        monumento.setHistoria(monumentoDetails.getHistoria());
        monumento.setTipo(monumentoDetails.getTipo());
        monumento.setUbicacion(monumentoDetails.getUbicacion());
        monumento.setHorario(monumentoDetails.getHorario());
        monumento.setPrecio_entrada(monumentoDetails.getPrecio_entrada());
        monumento.setImagen(monumentoDetails.getImagen());

        MonumentoHistorico updatedMonumento = monumentoHistoricoService.save(monumento);
        return ResponseEntity.ok(updatedMonumento);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMonumentoHistorico(@PathVariable Long id) {
        MonumentoHistorico monumento = monumentoHistoricoService.getById(id);
        if (monumento == null) {
            return ResponseEntity.notFound().build();
        }
        monumentoHistoricoService.delete(id);
        return ResponseEntity.noContent().build();
    }
}

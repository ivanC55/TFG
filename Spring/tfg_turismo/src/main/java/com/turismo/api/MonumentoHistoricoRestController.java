package com.turismo.api;

import com.turismo.model.entity.MonumentoHistorico;
import com.turismo.service.MonumentoHistoricoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public ResponseEntity<String> uploadImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            // Validar monumento
            MonumentoHistorico monumento = monumentoHistoricoService.getById(id);
            if (monumento == null) {
                return ResponseEntity.notFound().build();
            }

            // Guardar archivo
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            // Actualizar referencia de imagen en el monumento
            monumento.setImagen(fileName);
            monumentoHistoricoService.save(monumento);

            return ResponseEntity.ok("Imagen subida exitosamente: " + fileName);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error al subir la imagen.");
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

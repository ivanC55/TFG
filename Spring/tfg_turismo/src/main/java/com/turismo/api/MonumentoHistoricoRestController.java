package com.turismo.api;

import com.turismo.model.entity.MonumentoHistorico;
import com.turismo.service.MonumentoHistoricoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/monumentos")
@CrossOrigin(origins = "http://localhost:4200")
public class MonumentoHistoricoRestController {

    private final MonumentoHistoricoService monumentoHistoricoService;

    @Autowired
    public MonumentoHistoricoRestController(MonumentoHistoricoService monumentoHistoricoService) {
        this.monumentoHistoricoService = monumentoHistoricoService;
    }

    // Obtener todos los monumentos históricos
    @GetMapping
    public ResponseEntity<List<MonumentoHistorico>> getAllMonumentosHistoricos() {
        List<MonumentoHistorico> monumentos = monumentoHistoricoService.listAll();
        return ResponseEntity.ok(monumentos);
    }

    // Obtener monumento histórico por id
    @GetMapping("/{id}")
    public ResponseEntity<MonumentoHistorico> getMonumentoHistoricoById(@PathVariable Long id) {
        MonumentoHistorico monumento = monumentoHistoricoService.getById(id);
        return monumento != null ? ResponseEntity.ok(monumento) : ResponseEntity.notFound().build();
    }

    // Crear un nuevo monumento histórico
    @PostMapping
    public ResponseEntity<MonumentoHistorico> createMonumentoHistorico(@RequestBody MonumentoHistorico monumentoHistorico) {
        MonumentoHistorico newMonumento = monumentoHistoricoService.save(monumentoHistorico);
        return ResponseEntity.ok(newMonumento);
    }

    // Actualizar un monumento histórico existente
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

    // Eliminar un monumento histórico
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

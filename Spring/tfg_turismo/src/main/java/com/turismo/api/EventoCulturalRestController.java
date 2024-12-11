package com.turismo.api;

import com.turismo.model.entity.Alojamiento;
import com.turismo.model.entity.EventoCultural;
import com.turismo.model.entity.PuntoDeInteres;
import com.turismo.service.AlojamientoService;
import com.turismo.service.EventoCulturalService;
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
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "http://localhost:4200")
public class EventoCulturalRestController {
    private final EventoCulturalService eventoCulturalService;

    private final String UPLOAD_DIR = "src/main/resources/static/uploads/eventos/";


    @Autowired
   public EventoCulturalRestController (EventoCulturalService eventoCulturalService){
       this.eventoCulturalService = eventoCulturalService;

   }

    // Obtener todos los eventos culturales
    @GetMapping
    public ResponseEntity<List<EventoCultural>> getAllEventosCulturales() {
        List<EventoCultural> eventos = eventoCulturalService.listAll();
        return ResponseEntity.ok(eventos);
    }

    // Obtener evento cultural por id
    @GetMapping("/{id}")
    public ResponseEntity<EventoCultural> getEventoCulturalById(@PathVariable Long id) {
        EventoCultural evento = eventoCulturalService.getById(id);
        return evento != null ? ResponseEntity.ok(evento) : ResponseEntity.notFound().build();
    }

    // Crear un nuevo evento cultural
    @PostMapping
    public ResponseEntity<EventoCultural> createEventoCultural(@RequestBody EventoCultural eventoCultural) {
        EventoCultural newEventoCultural = eventoCulturalService.save(eventoCultural);
        return ResponseEntity.ok(newEventoCultural);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventoCultural> updateEventoCultural(@PathVariable Long id, @RequestBody EventoCultural eventoDetails) {
        EventoCultural evento = eventoCulturalService.getById(id);
        if (evento == null) {
            return ResponseEntity.notFound().build();
        }

        evento.setNombre(eventoDetails.getNombre());
        evento.setDescripcion(eventoDetails.getDescripcion());
        evento.setFecha_inicio(eventoDetails.getFecha_inicio());
        evento.setFecha_fin(eventoDetails.getFecha_fin());
        evento.setUbicacion(eventoDetails.getUbicacion());
        evento.setPrecio_entrada(eventoDetails.getPrecio_entrada());

        EventoCultural updatedEventoCultural = eventoCulturalService.save(evento);
        return ResponseEntity.ok(updatedEventoCultural);
    }

    // Eliminar evento cultural
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEventoCultural(@PathVariable Long id) {
        EventoCultural evento = eventoCulturalService.getById(id);
        if (evento == null) {
            return ResponseEntity.notFound().build();
        }
        eventoCulturalService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Buscar eventos culturales por nombre
    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<List<EventoCultural>> getEventosCulturalesByNombre(@PathVariable String nombre) {
        List<EventoCultural> eventos = eventoCulturalService.getByNombre(nombre).stream().toList();
        return ResponseEntity.ok(eventos);
    }

    // Buscar eventos culturales por ubicación
    @GetMapping("/ubicacion/{ubicacion}")
    public ResponseEntity<List<EventoCultural>> getEventosCulturalesByUbicacion(@PathVariable String ubicacion) {
        List<EventoCultural> eventos = eventoCulturalService.getByUbicacion(ubicacion);
        return ResponseEntity.ok(eventos);
    }

    @PostMapping("/upload/{id}")
    public ResponseEntity<?> uploadImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            EventoCultural evento = eventoCulturalService.getById(id);
            if (evento == null) {
                return ResponseEntity.status(404).body("{\"error\": \"Evento no encontrado\"}");
            }

            // Guardar archivo
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

            evento.setImagen(fileName);
            eventoCulturalService.save(evento);

            return ResponseEntity.ok("{\"message\": \"Imagen subida exitosamente\", \"fileName\": \"" + fileName + "\"}");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("{\"error\": \"Error al subir la imagen\"}");
        }
    }


    @GetMapping("/uploads/eventos/{filename}")
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

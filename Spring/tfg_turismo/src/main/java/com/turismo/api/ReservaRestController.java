package com.turismo.api;

import com.turismo.model.entity.Reserva;
import com.turismo.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins ="http://localhost:4200")
public class ReservaRestController {

    private final ReservaService reservaService;

    @Autowired
    public ReservaRestController(ReservaService reservaService) {
        this.reservaService = reservaService;
    }

    // Obtener todas las reservas
    @GetMapping
    public ResponseEntity<List<Reserva>> getAllReservas() {
        List<Reserva> reservas = reservaService.listAll();
        return ResponseEntity.ok(reservas);
    }

    // Obtener una reserva por id
    @GetMapping("/{id}")
    public ResponseEntity<Reserva> getReservaById(@PathVariable Long id) {
        Reserva reserva = reservaService.getById(id);
        return reserva != null ? ResponseEntity.ok(reserva) : ResponseEntity.notFound().build();
    }

    // Crear una nueva reserva
    @PostMapping
    public ResponseEntity<Reserva> createReserva(@RequestBody Reserva reserva) {
        Reserva newReserva = reservaService.save(reserva);
        return ResponseEntity.ok(newReserva);
    }

    // Actualizar una reserva existente
    @PutMapping("/{id}")
    public ResponseEntity<Reserva> updateReserva(@PathVariable Long id, @RequestBody Reserva reservaDetails) {
        Reserva reserva = reservaService.getById(id);
        if (reserva == null) {
            return ResponseEntity.notFound().build();
        }

        // Actualizar los campos de la reserva
        reserva.setUsuario(reservaDetails.getUsuario());
        reserva.setAlojamiento(reservaDetails.getAlojamiento());
        reserva.setRestaurante(reservaDetails.getRestaurante());
        reserva.setFechaReserva(reservaDetails.getFechaReserva());
        reserva.setHoraReserva(reservaDetails.getHoraReserva());
        reserva.setNumPersonas(reservaDetails.getNumPersonas());
        reserva.setEstado(reservaDetails.getEstado());

        Reserva updatedReserva = reservaService.save(reserva);
        return ResponseEntity.ok(updatedReserva);
    }

    // Eliminar una reserva
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReserva(@PathVariable Long id) {
        Reserva reserva = reservaService.getById(id);
        if (reserva == null) {
            return ResponseEntity.notFound().build();
        }
        reservaService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // Buscar reservas por usuario
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<Reserva>> getReservasByUsuario(@PathVariable Long idUsuario) {
        List<Reserva> reservas = reservaService.findByUsuario(idUsuario);
        return ResponseEntity.ok(reservas);
    }

    // Buscar reservas por alojamiento
    @GetMapping("/alojamiento/{idAlojamiento}")
    public ResponseEntity<List<Reserva>> getReservasByAlojamiento(@PathVariable Long idAlojamiento) {
        List<Reserva> reservas = reservaService.findByAlojamiento(idAlojamiento);
        return ResponseEntity.ok(reservas);
    }
}

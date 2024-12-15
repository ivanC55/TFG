package com.turismo.api;

import com.turismo.model.entity.Alojamiento;
import com.turismo.model.entity.Reserva;
import com.turismo.model.entity.Restaurante;
import com.turismo.model.entity.Usuario;
import com.turismo.model.repository.AlojamientoRepository;
import com.turismo.model.repository.ReservaRepository;
import com.turismo.model.repository.RestauranteRepository;
import com.turismo.model.repository.UsuarioRepository;
import com.turismo.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservas")
public class ReservaRestController {

    private final ReservaService reservaService;
    private final UsuarioRepository usuarioRepository;
    private final AlojamientoRepository alojamientoRepository;
    private final RestauranteRepository restauranteRepository;

    @Autowired
    public ReservaRestController(ReservaService reservaService,
                                 UsuarioRepository usuarioRepository,
                                 AlojamientoRepository alojamientoRepository,
                                 RestauranteRepository restauranteRepository) {
        this.reservaService = reservaService;
        this.usuarioRepository = usuarioRepository;
        this.alojamientoRepository = alojamientoRepository;
        this.restauranteRepository = restauranteRepository;
    }

    // Obtener todas las reservas
    @GetMapping
    public ResponseEntity<List<Reserva>> getAllReservas() {
        List<Reserva> reservas = reservaService.listAll();

        for (Reserva reserva : reservas) {
            reserva.setRestaurante(reserva.getRestaurante());
            reserva.setAlojamiento(reserva.getAlojamiento());
            reserva.setUsuario(reserva.getUsuario());
        }

        return ResponseEntity.ok(reservas);
    }


    // Obtener una reserva por id
    @GetMapping("/{id}")
    public ResponseEntity<Reserva> getReservaById(@PathVariable Long id) {
        Reserva reserva = reservaService.getById(id);
        return reserva != null ? ResponseEntity.ok(reserva) : ResponseEntity.notFound().build();
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<Reserva> createReserva(@RequestBody Reserva reserva) {
        System.out.println("Datos recibidos: " + reserva);
        // Verifica si la reserva es válida
        if (reserva == null || reserva.getUsuario() == null) {
            return ResponseEntity.badRequest().build();
        }

        Usuario usuario = usuarioRepository.findById(reserva.getUsuario().getId()).orElse(null);
        Alojamiento alojamiento = (reserva.getAlojamiento() != null) ? alojamientoRepository.findById(reserva.getAlojamiento().getIdAlojamiento()).orElse(null) : null;
        Restaurante restaurante = (reserva.getRestaurante() != null) ? restauranteRepository.findById(reserva.getRestaurante().getIdRestaurante()).orElse(null) : null;

        if (usuario == null || alojamiento == null) {
            return ResponseEntity.badRequest().build();
        }

        reserva.setUsuario(usuario);
        reserva.setAlojamiento(alojamiento);
        if (restaurante != null) {
            reserva.setRestaurante(restaurante);
        }

        Reserva savedReserva = reservaService.save(reserva);

        return ResponseEntity.ok(savedReserva);
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
        reserva.setFechaInicio(reservaDetails.getFechaInicio());
        reserva.setFechaFin(reservaDetails.getFechaFin());
        reserva.setHoraEntrada(reservaDetails.getHoraEntrada());
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
package com.turismo.service.impl;

import com.turismo.model.entity.Restaurante;
import com.turismo.model.repository.RestauranteRepository;
import com.turismo.service.RestauranteService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestauranteServiceImpl  implements RestauranteService {
    private final RestauranteRepository restauranteRepository;
    public RestauranteServiceImpl (RestauranteRepository restauranteRepository){
        this.restauranteRepository = restauranteRepository;
    }
    @Override
    public Restaurante save(Restaurante restaurante) {
        return restauranteRepository.save(restaurante);
    }

    @Override
    public void delete(Long id) {
        restauranteRepository.deleteById(id);
    }

    @Override
    public Restaurante getById(Long id) {
        return restauranteRepository.findById(id).orElse(null);
    }


    @Override
    public List<Restaurante> listAll() {
        return restauranteRepository.findAll();
    }

    @Override
    public Optional<Restaurante> findByNombre(String nombre) {
        return restauranteRepository.findByNombre(nombre);
    }

    @Override
    public List<Restaurante> findByTipoComida(String tipoComida) {
        return restauranteRepository.findByTipoComida(tipoComida);
    }
}

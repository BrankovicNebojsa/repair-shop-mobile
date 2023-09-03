package com.mechanics_store.controller;

import com.mechanics_store.controller.dto.EngineDTO;
import com.mechanics_store.controller.dto.PriceDTO;
import com.mechanics_store.controller.mapper.EngineMapper;
import com.mechanics_store.controller.mapper.PriceMapper;
import java.util.List;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.mechanics_store.service.EngineService;
import com.mechanics_store.service.PriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 *
 * @author Nebojsa Brankovic
 */
@RestController
@RequestMapping("/api/v1/prices")
public class PriceController {

    private final PriceService priceService;

    private final PriceMapper priceMapper;

    @Autowired
    public PriceController(PriceService priceService, PriceMapper priceMapper) {
        this.priceService = priceService;
        this.priceMapper = priceMapper;
    }

    @GetMapping
    public ResponseEntity<List<PriceDTO>> getAllPrices() {
        return ResponseEntity.ok(priceMapper.entitiesToDTOs(priceService.findAll()));
    }

    @PostMapping("")
    public ResponseEntity<PriceDTO> savePrice(@RequestBody PriceDTO priceDTO) {
        return new ResponseEntity<>(priceMapper.entityToDTO(priceService.save(priceMapper.DTOToEntity(priceDTO))), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePrice(@PathVariable Long id) {
        if (priceService.delete(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

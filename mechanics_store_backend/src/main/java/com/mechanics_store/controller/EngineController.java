package com.mechanics_store.controller;

import com.mechanics_store.controller.dto.EngineDTO;
import com.mechanics_store.controller.mapper.EngineMapper;
import java.util.List;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.mechanics_store.service.EngineService;
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
@RequestMapping("/api/v1/engines")
public class EngineController {

    private final EngineService engineService;

    private final EngineMapper engineMapper;

    @Autowired
    public EngineController(EngineService engineService, EngineMapper engineMapper) {
        this.engineService = engineService;
        this.engineMapper = engineMapper;
    }

    @GetMapping
    public ResponseEntity<List<EngineDTO>> getAllEngines() {
        return ResponseEntity.ok(engineMapper.entitiesToDTOs(engineService.findAll()));
    }

    @PostMapping("")
    public ResponseEntity<EngineDTO> saveEngine(@RequestBody EngineDTO engineDTO) {
        return new ResponseEntity<>(engineMapper.entityToDTO(engineService.save(engineMapper.DTOToEntity(engineDTO))), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEngine(@PathVariable Long id) {
        if (engineService.delete(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

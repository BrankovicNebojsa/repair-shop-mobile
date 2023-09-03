package com.mechanics_store.controller;

import com.mechanics_store.controller.dto.ModelDTO;
import com.mechanics_store.controller.mapper.ModelMapper;
import java.util.List;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.mechanics_store.service.ModelService;
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
@RequestMapping("/api/v1/models")
public class ModelController {

    private final ModelService modelService;

    private final ModelMapper modelMapper;

    @Autowired
    public ModelController(ModelService modelService, ModelMapper modelMapper) {
        this.modelService = modelService;
        this.modelMapper = modelMapper;
    }

    @GetMapping
    public ResponseEntity<List<ModelDTO>> getAllModels() {
        return ResponseEntity.ok(modelMapper.entitiesToDTOs(modelService.findAll()));
    }

    @PostMapping
    public ResponseEntity<ModelDTO> saveModel(@RequestBody ModelDTO modelDTO) {
        return new ResponseEntity<>(modelMapper.entityToDTO(modelService.save(modelMapper.DTOToEntity(modelDTO))), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteModel(@PathVariable Long id) {
        if (modelService.delete(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

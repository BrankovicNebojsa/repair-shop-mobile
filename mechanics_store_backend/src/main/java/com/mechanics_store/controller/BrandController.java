package com.mechanics_store.controller;

import com.mechanics_store.controller.dto.BrandDTO;
import com.mechanics_store.controller.mapper.BrandMapper;
import java.util.List;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.mechanics_store.service.BrandService;
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
@RequestMapping("/api/v1/brands")
public class BrandController {

    private final BrandService brandService;

    private final BrandMapper brandMapper;

    @Autowired
    public BrandController(BrandService brandService, BrandMapper brandMapper) {
        this.brandService = brandService;
        this.brandMapper = brandMapper;
    }

    @GetMapping
    public ResponseEntity<List<BrandDTO>> getAllBrands() {
        return ResponseEntity.ok(brandMapper.entitiesToDTOs(brandService.findAll()));
    }

    @PostMapping("")
    public ResponseEntity<BrandDTO> saveBrand(@RequestBody BrandDTO brandDTO) {
        return new ResponseEntity<>(brandMapper.entityToDTO(brandService.save(brandMapper.DTOToEntity(brandDTO))), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBrand(@PathVariable Long id) {
        if (brandService.delete(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

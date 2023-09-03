package com.mechanics_store.controller.mapper;

import com.mechanics_store.controller.dto.BrandDTO;
import com.mechanics_store.model.Brand;
import org.springframework.stereotype.Component;

/**
 *
 * @author Nebojsa Brankovic
 */
@Component
public class BrandMapper implements Mapper<Brand, BrandDTO> {

    @Override
    public BrandDTO entityToDTO(Brand brand) {
        return new BrandDTO(brand.getId(), brand.getName());
    }

    @Override
    public Brand DTOToEntity(BrandDTO brandDTO) {
        return new Brand(brandDTO.name());
    }
}

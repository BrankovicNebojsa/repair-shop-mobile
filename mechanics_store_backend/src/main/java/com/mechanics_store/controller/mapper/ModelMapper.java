package com.mechanics_store.controller.mapper;

import com.mechanics_store.controller.dto.ModelDTO;
import com.mechanics_store.model.Model;
import org.springframework.stereotype.Component;

/**
 *
 * @author Nebojsa Brankovic
 */
@Component
public class ModelMapper implements Mapper<Model, ModelDTO> {

    private BrandMapper brandMapper;

    public ModelMapper(BrandMapper brandMapper) {
        this.brandMapper = brandMapper;
    }

    @Override
    public ModelDTO entityToDTO(Model model) {
        return new ModelDTO(model.getId(), brandMapper.entityToDTO(model.getBrand()), model.getName());
    }

    @Override
    public Model DTOToEntity(ModelDTO modelDTO) {
        if (modelDTO == null) {
            return null;
        }
        return new Model(modelDTO.name(), brandMapper.DTOToEntity(modelDTO.brand()));
    }
}

package com.mechanics_store.controller.mapper;

import com.mechanics_store.controller.dto.EngineDTO;
import com.mechanics_store.model.Engine;
import org.springframework.stereotype.Component;

/**
 *
 * @author Nebojsa Brankovic
 */
@Component
public class EngineMapper implements Mapper<Engine, EngineDTO> {

    @Override
    public EngineDTO entityToDTO(Engine engine) {
        return new EngineDTO(engine.getId(), engine.getNumberOfCylinders(), engine.getPower(), engine.getCapacity());
    }

    @Override
    public Engine DTOToEntity(EngineDTO engineDTO) {
        if (engineDTO == null) {
            return null;
        }
        return new Engine(engineDTO.numberOfCylinders(), engineDTO.power(), engineDTO.capacity());
    }
}

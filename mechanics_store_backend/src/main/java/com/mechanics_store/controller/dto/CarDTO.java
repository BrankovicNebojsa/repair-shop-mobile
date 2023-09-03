package com.mechanics_store.controller.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 *
 * @author Nebojsa Brankovic
 */
public record CarDTO(
        Long id,
        String licensePlate,
        @NotNull
        Integer year,
        @NotBlank
        String engineNumber,
        @NotBlank
        String chassisNumber,
        @NotBlank
        String color,
        @NotBlank
        String transmission,
        ModelDTO model,
        EngineDTO engine,
        UserDTO owner) {

}

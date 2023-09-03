package com.mechanics_store.controller.dto;

import jakarta.validation.constraints.NotNull;

/**
 *
 * @author Nebojsa Brankovic
 */
public record EngineDTO(
        Long id,
        @NotNull(message = "Number of cylinders must be filled")
        int numberOfCylinders,
        @NotNull(message = "Power of an engine must be filled")
        int power,
        @NotNull(message = "Capacity of an engine must be filled")
        double capacity) {

}

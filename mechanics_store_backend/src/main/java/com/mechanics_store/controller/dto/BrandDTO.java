package com.mechanics_store.controller.dto;

import jakarta.validation.constraints.NotBlank;

/**
 *
 * @author Nebojsa Brankovic
 */
public record BrandDTO(
        Long id,
        @NotBlank(message = "Name of a brand must be filled")
        String name) {

}

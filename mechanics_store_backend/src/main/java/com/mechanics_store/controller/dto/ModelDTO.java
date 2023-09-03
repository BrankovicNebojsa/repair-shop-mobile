package com.mechanics_store.controller.dto;

import jakarta.validation.constraints.NotBlank;

/**
 *
 * @author Nebojsa Brankovic
 */
public record ModelDTO(
        Long id,
        BrandDTO brand,
        @NotBlank(message = "Name of a model must be filled")
        String name) {
}

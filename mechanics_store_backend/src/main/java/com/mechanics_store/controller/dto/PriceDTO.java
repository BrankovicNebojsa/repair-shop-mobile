package com.mechanics_store.controller.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 *
 * @author Nebojsa Brankovic
 */
public record PriceDTO(
        Long id,
        @NotBlank(message = "Name of service must be filled")
        String nameOfService,
        @NotNull(message = "Price must be filled")
        double price) {

}

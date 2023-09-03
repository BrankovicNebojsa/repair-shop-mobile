package com.mechanics_store.controller.dto;

import jakarta.validation.constraints.NotBlank;

/**
 *
 * @author Nebojsa Brankovic
 */
public record ReservationDTO(
        Long id,
        @NotBlank
        String date,
        CarDTO car,
        UserDTO mechanic) {

}

package com.mechanics_store.controller.dto;

import jakarta.validation.constraints.NotBlank;

public record UserDTO(
        Long id,
        @NotBlank(message = "First name must be filled")
        String firstName,
        @NotBlank(message = "Last name must be filled")
        String lastName,
        @NotBlank(message = "Email must be filled")
        String email,
        @NotBlank(message = "Phone number must be filled")
        String phoneNumber,
        @NotBlank(message = "Username must be filled")
        String username,
        @NotBlank(message = "Password must be filled")
        String password,
        @NotBlank(message = "Role must be filled")
        String role) {

}

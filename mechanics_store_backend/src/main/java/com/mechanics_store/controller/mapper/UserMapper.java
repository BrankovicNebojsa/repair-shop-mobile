package com.mechanics_store.controller.mapper;

import com.mechanics_store.controller.dto.UserDTO;
import com.mechanics_store.exception.EntityNotFoundException;
import com.mechanics_store.model.Role;
import com.mechanics_store.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper implements Mapper<User, UserDTO> {

    @Override
    public UserDTO entityToDTO(User user) {
        return new UserDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getUsername(),
                user.getPassword(),
                user.getRole().toString()
        );
    }

    @Override
    public User DTOToEntity(UserDTO userDTO) {
        if (userDTO == null) {
            return null;
        }
        Role role = null;
        if (userDTO.role() != null) {
            switch (userDTO.role().toUpperCase()) {
                case "WORKER":
                    role = Role.WORKER;
                    break;
                case "CLIENT":
                    role = Role.CLIENT;
                    break;
                default:
                    throw new EntityNotFoundException("Bad input for a role");
            }
        }
        return new User(userDTO.firstName(), userDTO.lastName(), userDTO.email(),
                userDTO.phoneNumber(), userDTO.username(), userDTO.password(), role);
    }
}

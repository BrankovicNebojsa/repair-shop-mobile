package com.mechanics_store.controller;

import com.mechanics_store.controller.dto.UserDTO;
import com.mechanics_store.controller.mapper.UserMapper;
import com.mechanics_store.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    private final UserMapper userMapper;

    @Autowired
    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userMapper.entitiesToDTOs(userService.findAll()));
    }

    @GetMapping("/mechanics")
    public ResponseEntity<List<UserDTO>> getAllMechanics() {
        return ResponseEntity.ok(userMapper.entitiesToDTOs(userService.getAllMechanics()));
    }

    @GetMapping("/current")
    public ResponseEntity<UserDTO> getCurrentUser() {
        return ResponseEntity.ok(userMapper.entityToDTO(userService.getCurrentUser()));
    }

    @PatchMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody Map<String, Object> attributes) {
        return ResponseEntity.ok(userMapper.entityToDTO(userService.update(id, attributes)));
    }

}

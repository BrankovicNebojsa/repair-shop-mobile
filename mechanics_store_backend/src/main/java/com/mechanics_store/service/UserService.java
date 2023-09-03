package com.mechanics_store.service;

import com.mechanics_store.auth.AuthenticationService;
import com.mechanics_store.auth.RegisterRequest;
import com.mechanics_store.model.Role;
import com.mechanics_store.model.User;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import com.mechanics_store.repository.UserRepository;

/**
 * Contains business logic for a User class
 *
 * Class that's used to control and manipulate data related to user class.
 * Enables creating, reading, updating and deleting a user.
 *
 * @author Nebojsa Brankovic
 */
@Service
public class UserService {

    private final UserRepository userRepository;

    private AuthenticationService authService;

    public UserService(UserRepository userRepository, AuthenticationService authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public List<User> getAllMechanics() {
        return userRepository.findAllByRole(Role.WORKER);
    }

    public User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public Boolean isCurrentUserAWorker() {
        return SecurityContextHolder.getContext().getAuthentication().getAuthorities().contains(new SimpleGrantedAuthority("WORKER"));
    }

    public User save(User user) {
        Optional<User> userFromDB = userRepository.findByUsername(user.getUsername());
        if (!userFromDB.isEmpty()) {
            return userFromDB.get();
        }
        RegisterRequest request = new RegisterRequest(user.getFirstName(), user.getLastName(), user.getUsername(),
                user.getPassword(), user.getEmail(), user.getPhoneNumber(), user.getRole().toString());
        authService.register(request);
        return userRepository.findByUsername(user.getUsername()).get();
    }

    public User update(User user) {
        userRepository.findById(user.getId()).ifPresent(userRepository::save);
        return userRepository.save(user);
    }

    public User update(Long id, Map<String, Object> fields) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            fields.forEach((key, value) -> {
                Field field = ReflectionUtils.findField(User.class, key);
                field.setAccessible(true);
                ReflectionUtils.setField(field, existingUser.get(), value);
            });
            return userRepository.save(existingUser.get());
        }
        return null;
    }
}

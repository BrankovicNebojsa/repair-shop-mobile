package com.mechanics_store.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.mechanics_store.config.JwtService;
import com.mechanics_store.exception.EntityNotFoundException;
import com.mechanics_store.model.User;
import com.mechanics_store.model.Role;
import com.mechanics_store.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) throws EntityNotFoundException {
        Role role = null;
        switch (request.getRole()) {
            case "WORKER":
                role = Role.WORKER;
                break;
            case "CLIENT":
                role = Role.CLIENT;
                break;
            default:
                throw new EntityNotFoundException("Bad input for a user role");
        }
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .isWorker(user.getRole().equals(Role.WORKER))
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(),
                request.getPassword()));
        User user = repository.findByUsername(request.getUsername()).orElseThrow();
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .isWorker(user.getRole().equals(Role.WORKER))
                .build();
    }
}

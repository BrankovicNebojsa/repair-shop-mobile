package com.mechanics_store.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.disable())
                .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/api/v1/auth/**").permitAll()
                //                .requestMatchers(HttpMethod.GET, "/api/v1/users").hasAuthority("WORKER")
                //                .requestMatchers(HttpMethod.GET, "/api/v1/users/current").hasAnyAuthority("CLIENT", "WORKER")
                //                .requestMatchers(HttpMethod.GET, "/api/v1/users/mechanics").hasAnyAuthority("CLIENT", "WORKER")
                //                .requestMatchers(HttpMethod.GET, "/api/v1/brands/**").hasAnyAuthority("CLIENT", "WORKER")
                //                .requestMatchers(HttpMethod.GET, "/api/v1/models/**").hasAnyAuthority("CLIENT", "WORKER")
                //                .requestMatchers(HttpMethod.GET, "/api/v1/engines/**").hasAnyAuthority("CLIENT", "WORKER")
                //                .requestMatchers(HttpMethod.GET, "/api/v1/cars/**").hasAnyAuthority("CLIENT", "WORKER")
                //                .requestMatchers(HttpMethod.GET, "/api/v1/reservations/**").hasAnyAuthority("CLIENT", "WORKER")
                //                .requestMatchers(HttpMethod.GET, "/api/v1/prices").hasAnyAuthority("CLIENT", "WORKER")
                //                .requestMatchers(HttpMethod.POST, "/api/v1/brands/**").hasAnyAuthority("CLIENT", "WORKER")
                //                .requestMatchers(HttpMethod.POST, "/api/v1/models/**").hasAnyAuthority("CLIENT", "WORKER")
                //                .requestMatchers(HttpMethod.POST, "/api/v1/engines/**").hasAnyAuthority("CLIENT", "WORKER")
                //                .requestMatchers(HttpMethod.POST, "/api/v1/cars/**").hasAnyAuthority("CLIENT", "WORKER")
                //                .requestMatchers(HttpMethod.POST, "/api/v1/reservations/**").hasAnyAuthority("CLIENT", "WORKER")
                //                .requestMatchers(HttpMethod.POST, "/api/v1/prices").hasAuthority("WORKER")
                //                .requestMatchers(HttpMethod.PATCH, "/api/v1/users/**").hasAnyAuthority("CLIENT", "WORKER")
                //                .requestMatchers(HttpMethod.DELETE, "/api/v1/brands/**").hasAuthority("WORKER")
                //                .requestMatchers(HttpMethod.DELETE, "/api/v1/models/**").hasAuthority("WORKER")
                //                .requestMatchers(HttpMethod.DELETE, "/api/v1/engines/**").hasAuthority("WORKER")
                //                .requestMatchers(HttpMethod.DELETE, "/api/v1/cars/**").hasAuthority("WORKER")
                //                .requestMatchers(HttpMethod.DELETE, "/api/v1/reservations/**").hasAuthority("WORKER")
                //                .requestMatchers(HttpMethod.DELETE, "/api/v1/prices").hasAuthority("WORKER")

                .requestMatchers(HttpMethod.GET, "/api/v1/users").hasAuthority("WORKER")
                .requestMatchers(HttpMethod.GET, "/api/v1/users/current").hasAnyAuthority("CLIENT", "WORKER")
                .requestMatchers(HttpMethod.GET, "/api/v1/users/mechanics").hasAnyAuthority("CLIENT", "WORKER")
                .requestMatchers(HttpMethod.GET, "/api/v1/brands/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/v1/models/**").hasAnyAuthority("CLIENT", "WORKER")
                .requestMatchers(HttpMethod.GET, "/api/v1/engines/**").hasAnyAuthority("CLIENT", "WORKER")
                .requestMatchers(HttpMethod.GET, "/api/v1/cars/**").hasAnyAuthority("CLIENT", "WORKER")
                .requestMatchers(HttpMethod.GET, "/api/v1/reservations/**").hasAnyAuthority("CLIENT", "WORKER")
                .requestMatchers(HttpMethod.GET, "/api/v1/prices").hasAnyAuthority("CLIENT", "WORKER")
                .requestMatchers(HttpMethod.POST, "/api/v1/brands/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/v1/models/**").hasAnyAuthority("CLIENT", "WORKER")
                .requestMatchers(HttpMethod.POST, "/api/v1/engines/**").hasAnyAuthority("CLIENT", "WORKER")
                .requestMatchers(HttpMethod.POST, "/api/v1/cars/**").hasAnyAuthority("CLIENT", "WORKER")
                .requestMatchers(HttpMethod.POST, "/api/v1/reservations/**").hasAnyAuthority("CLIENT", "WORKER")
                .requestMatchers(HttpMethod.POST, "/api/v1/prices").hasAuthority("WORKER")
                .requestMatchers(HttpMethod.PATCH, "/api/v1/users/**").hasAnyAuthority("CLIENT", "WORKER")
                .requestMatchers(HttpMethod.DELETE, "/api/v1/brands/**").hasAuthority("WORKER")
                .requestMatchers(HttpMethod.DELETE, "/api/v1/models/**").hasAuthority("WORKER")
                .requestMatchers(HttpMethod.DELETE, "/api/v1/engines/**").hasAuthority("WORKER")
                .requestMatchers(HttpMethod.DELETE, "/api/v1/cars/**").hasAuthority("WORKER")
                .requestMatchers(HttpMethod.DELETE, "/api/v1/reservations/**").hasAuthority("WORKER")
                .requestMatchers(HttpMethod.DELETE, "/api/v1/prices").hasAuthority("WORKER")

                .anyRequest().authenticated())
                .sessionManagement((session) -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}

package com.mechanics_store.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.hibernate.annotations.NaturalId;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

/**
 * Represents entity in database called user.
 *
 * It's also used as for an identification of application user Stores all the
 * important information about a user such as: first name, last name, username
 * and password
 *
 * @author Nebojsa Brankovic
 */
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@EqualsAndHashCode
@Entity(name = "user")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "First name must be filled")
    private String firstName;

    @NotBlank(message = "Last name must be filled")
    private String lastName;

    @NotBlank(message = "Email must be filled")
    private String email;

    @NotBlank(message = "Phone number must be filled")
    private String phoneNumber;

    @NotBlank(message = "Username must be filled")
    @NaturalId
    private String username;

    @NotBlank(message = "Password must be filled")
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role;

    public User(String firstName, String lastName, String email, String phoneNumber, String username, String password, Role role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public String toString() {
        return "User{" + "id: " + this.id + ", firstName: " + this.firstName + ", lastName: " + this.lastName +
                ", email: " + this.email + ", phoneNumber: " + this.phoneNumber + ", username: " + this.username +
                ", password: " + this.password + ", role: " + this.role.toString() + '}';
    }

}

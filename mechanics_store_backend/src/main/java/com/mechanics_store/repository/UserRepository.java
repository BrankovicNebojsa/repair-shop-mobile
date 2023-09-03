package com.mechanics_store.repository;

import com.mechanics_store.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import com.mechanics_store.model.User;
import java.util.List;

/**
 *
 * @author Nebojsa Brankovic
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    public Optional<User> findByUsername(String username);

    public List<User> findAllByRole(Role role);

}

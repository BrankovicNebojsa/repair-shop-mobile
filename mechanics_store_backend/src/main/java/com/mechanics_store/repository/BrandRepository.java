package com.mechanics_store.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.mechanics_store.model.Brand;
import java.util.Optional;

/**
 *
 * @author Nebojsa Brankovic
 */
@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {

    public Optional<Brand> findByName(String name);
    
}

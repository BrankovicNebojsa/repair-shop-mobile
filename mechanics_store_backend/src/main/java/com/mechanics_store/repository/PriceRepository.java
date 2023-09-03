package com.mechanics_store.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.mechanics_store.model.Price;
import java.util.Optional;

/**
 *
 * @author Nebojsa Brankovic
 */
@Repository
public interface PriceRepository extends JpaRepository<Price, Long> {

    public Optional<Price> findByNameOfServiceAndPrice(String nameOfService, double price);

}

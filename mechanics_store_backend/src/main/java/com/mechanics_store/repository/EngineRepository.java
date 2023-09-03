package com.mechanics_store.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.mechanics_store.model.Engine;
import java.util.Optional;

/**
 *
 * @author Nebojsa Brankovic
 */
@Repository
public interface EngineRepository extends JpaRepository<Engine, Long> {

    public Optional<Engine> findByNumberOfCylindersAndPowerAndCapacity(int numberOfCylinders, int power, double capacity);

}

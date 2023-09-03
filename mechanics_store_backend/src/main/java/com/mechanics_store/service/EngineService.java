package com.mechanics_store.service;

import com.mechanics_store.model.Engine;
import com.mechanics_store.repository.EngineRepository;
import jakarta.persistence.EntityExistsException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Contains business logic for an Engine class
 *
 * Class that's used to control and manipulate data related to engine class.
 * Enables creating, reading, updating and deleting an engine .
 *
 * @author Nebojsa Brankovic
 */
@Service
public class EngineService {

    private final EngineRepository engineRepository;

    @Autowired
    public EngineService(EngineRepository engineRepository) {
        this.engineRepository = engineRepository;
    }

    public Engine save(Engine engine) {
        Optional<Engine> engineFromDB = engineRepository.findByNumberOfCylindersAndPowerAndCapacity(engine.getNumberOfCylinders(),
                engine.getPower(), engine.getCapacity());
        if (engineFromDB == null || engineFromDB.isEmpty()) {
            Engine engine2 = engineRepository.save(engine);
            return engine2;
        } else {
            EntityExistsException e = new EntityExistsException("Engine with that data already exists");
            throw e;
        }
    }

    public Optional<Engine> findById(Long id) {
        return engineRepository.findById(id);
    }

    public Optional<Engine> findByAll(int numberOfCylinders, int power, double capacity) {
        return engineRepository.findByNumberOfCylindersAndPowerAndCapacity(numberOfCylinders, power, capacity);
    }

    public List<Engine> findAll() {
        return engineRepository.findAll();
    }

    public Engine update(Engine engine) {
        engineRepository.findById(engine.getId()).ifPresent(engineRepository::save);
        return engineRepository.save(engine);
    }

    public boolean delete(Long id) {
        Optional<Engine> optionalEngine = engineRepository.findById(id);
        if (optionalEngine.isPresent()) {
            engineRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

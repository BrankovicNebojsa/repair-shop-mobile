package com.mechanics_store.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.mechanics_store.model.Model;
import java.util.Optional;

/**
 *
 * @author Nebojsa Brankovic
 */
@Repository
public interface ModelRepository extends JpaRepository<Model, Long> {

    public Optional<Model> findByNameAndBrandId(String modelName, long brandId);

}

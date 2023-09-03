package com.mechanics_store.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.mechanics_store.model.Car;
import com.mechanics_store.model.Engine;
import com.mechanics_store.model.Model;
import com.mechanics_store.model.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author Nebojsa Brankovic
 */
@Repository
public interface CarRepository extends JpaRepository<Car, Long> {

    public Optional<Car> findByModel(Model model);

    public Optional<Car> findByEngine(Engine engine);

    public Optional<Car> findByLicensePlate(String licensePlate);

    public List<Car> findAllByOwner(User user);

    @Query(value = "select * from car c where c.license_plate like %:license_plate%", nativeQuery = true)
    public List<Car> findUsersByKeyword(@Param("license_plate") String license_plate);

    @Query(value = "select * from car c where c.owner_id=:owner_id AND c.license_plate like %:license_plate%", nativeQuery = true)
    public List<Car> findUsersByKeywordForOwner(@Param("license_plate") String license_plate, @Param("owner_id") Long owner_id);

}

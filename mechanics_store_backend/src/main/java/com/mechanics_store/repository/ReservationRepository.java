package com.mechanics_store.repository;

import com.mechanics_store.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.mechanics_store.model.Reservation;
import com.mechanics_store.model.User;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author Nebojsa Brankovic
 */
@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    public Optional<Reservation> findByCar(Car car);

    public List<Reservation> findAllByCarOwner(User user);

}

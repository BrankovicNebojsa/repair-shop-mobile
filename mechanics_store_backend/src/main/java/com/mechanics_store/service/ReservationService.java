package com.mechanics_store.service;

import com.mechanics_store.model.Car;
import com.mechanics_store.model.Reservation;
import com.mechanics_store.model.Role;
import com.mechanics_store.model.User;
import com.mechanics_store.repository.ReservationRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Contains business logic for a Reservation class
 *
 * Class that's used to control and manipulate data related to reservation
 * class. Enables creating, reading, updating and deleting a reservation.
 *
 * @author Nebojsa Brankovic
 */
@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    private final CarService carService;

    private final UserService userService;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository, CarService carService, UserService userService) {
        this.reservationRepository = reservationRepository;
        this.carService = carService;
        this.userService = userService;
    }

    public Reservation save(Reservation reservation) {
        Optional<Car> car = carService.findByLicensePlate(reservation.getCar().getLicensePlate());
        if (car == null || car.isEmpty()) {
            Car car2 = carService.save(reservation.getCar());
            reservation.setCar(car2);
        } else {
            reservation.setCar(car.get());
        }

        if (reservation.getMechanic() == null) {
            reservation.setMechanic(userService.getCurrentUser());
        } else {
            Optional<User> mechanic = userService.findByUsername(reservation.getMechanic().getUsername());
            if (mechanic == null || mechanic.isEmpty()) {
                reservation.setMechanic(userService.save(reservation.getMechanic()));
            } else {
                reservation.setMechanic(mechanic.get());
            }
        }

        if (reservation.getMechanic().getRole() != null && reservation.getMechanic().getRole().equals(Role.CLIENT)) {
            IllegalArgumentException e = new IllegalArgumentException("Tried to assign a mechanic to a user whose role is Role.CLIENT");
            throw e;
        }
        Reservation reservation2;
        try {
            reservation2 = reservationRepository.save(reservation);
        } catch (Exception e) {
            throw e;
        }
        return reservation2;
    }

    public List<Reservation> findReservationsOfOwner(User user) {
        return reservationRepository.findAllByCarOwner(user);
    }

    public List<Reservation> findAll() {
        return reservationRepository.findAll();
    }

    public Reservation update(Reservation reservation) {
        reservationRepository.findById(reservation.getId()).ifPresent(reservationRepository::save);
        return reservationRepository.save(reservation);
    }

    public boolean delete(Long id) {
        Optional<Reservation> optionalReservation = reservationRepository.findById(id);
        if (optionalReservation.isPresent()) {
            reservationRepository.deleteById(id);
            return true;
        }
        return false;
    }

}

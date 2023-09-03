package com.mechanics_store.controller;

import com.mechanics_store.controller.dto.ReservationDTO;
import com.mechanics_store.controller.mapper.ReservationMapper;
import com.mechanics_store.service.ReservationService;
import com.mechanics_store.service.UserService;
import java.util.List;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

/**
 *
 * @author Nebojsa Brankovic
 */
@RestController
@RequestMapping("/api/v1/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    private final ReservationMapper reservationMapper;

    private final UserService userService;

    @Autowired
    public ReservationController(ReservationService reservationService, ReservationMapper reservatopmMapper, UserService userService) {
        this.reservationService = reservationService;
        this.reservationMapper = reservatopmMapper;
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<ReservationDTO>> getAllReservations() {
        if (userService.isCurrentUserAWorker()) {
            return ResponseEntity.ok(reservationMapper.entitiesToDTOs(reservationService.findAll()));
        } else {
            return ResponseEntity.ok(reservationMapper.entitiesToDTOs(reservationService.findReservationsOfOwner(userService.getCurrentUser())));
        }
    }

    @PostMapping
    public ResponseEntity<ReservationDTO> saveReservations(@RequestBody ReservationDTO reservationDTO) {
        return new ResponseEntity<>(reservationMapper.entityToDTO(reservationService.save(reservationMapper.DTOToEntity(reservationDTO))), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Long id) {
        if (reservationService.delete(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

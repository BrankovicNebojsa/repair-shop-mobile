package com.mechanics_store.controller;

import com.mechanics_store.controller.dto.CarDTO;
import com.mechanics_store.controller.mapper.CarMapper;
import com.mechanics_store.service.CarService;
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
@RequestMapping("/api/v1/cars")
public class CarController {

    private final CarService carService;

    private final CarMapper carMapper;

    private final UserService userService;

    @Autowired
    public CarController(CarService carService, CarMapper carMapper, UserService userService) {
        this.carService = carService;
        this.carMapper = carMapper;
        this.userService = userService;
    }

    @GetMapping("")
    public ResponseEntity<List<CarDTO>> getAllCars() {
        if (userService.isCurrentUserAWorker()) {
            return ResponseEntity.ok(carMapper.entitiesToDTOs(carService.findAll()));
        } else {
            return ResponseEntity.ok(carMapper.entitiesToDTOs(carService.findCarsOfOwner(userService.getCurrentUser())));
        }
    }

    @GetMapping("/")
    public ResponseEntity<List<CarDTO>> getAllCars2() {
        return getAllCars();
    }

    @GetMapping("/sorted-asc")
    public ResponseEntity<List<CarDTO>> getAllCarsASC() {
        if (userService.isCurrentUserAWorker()) {
            return ResponseEntity.ok(carMapper.entitiesToDTOs(carService.findAllASC()));
        } else {
            return getAllCars();
        }
    }

    @GetMapping("/sorted-desc")
    public ResponseEntity<List<CarDTO>> getAllCarsDESC() {
        if (userService.isCurrentUserAWorker()) {
            return ResponseEntity.ok(carMapper.entitiesToDTOs(carService.findAllDESC()));
        } else {
            return getAllCars();
        }
    }

    @GetMapping("/{licensePlate}")
    public ResponseEntity<List<CarDTO>> getAllReservationsWhereDate(@PathVariable String licensePlate) {
        if (userService.isCurrentUserAWorker()) {
            return ResponseEntity.ok(carMapper.entitiesToDTOs(carService.findAllWhere(licensePlate)));
        } else {
            return ResponseEntity.ok(carMapper.entitiesToDTOs(carService.findAllWhereOwner(licensePlate, userService.getCurrentUser())));
        }
    }

    @PostMapping
    public ResponseEntity<CarDTO> saveCar(@RequestBody CarDTO carDTO) {
        return new ResponseEntity<>(carMapper.entityToDTO(carService.save(carMapper.DTOToEntity(carDTO))), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
        if (carService.delete(id)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}

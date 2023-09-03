package com.mechanics_store.service;

import com.mechanics_store.exception.EntityNotFoundException;
import com.mechanics_store.model.Car;
import com.mechanics_store.model.Color;
import com.mechanics_store.model.Engine;
import com.mechanics_store.model.Model;
import com.mechanics_store.model.Transmission;
import com.mechanics_store.model.User;
import com.mechanics_store.repository.CarRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

/**
 * Contains business logic for a Model class
 *
 * Class that's used to control and manipulate data related to model class.
 * Enables creating, reading, updating and deleting a model.
 *
 * @author Nebojsa Brankovic
 */
@Service
public class CarService {

    private final CarRepository carRepository;

    private final ModelService modelService;

    private final EngineService engineService;

    private final UserService userService;

    @Autowired
    public CarService(CarRepository carRepository, ModelService modelService, EngineService engineService, UserService userService) {
        this.carRepository = carRepository;
        this.modelService = modelService;
        this.engineService = engineService;
        this.userService = userService;
    }

    public Car save(Car car) {
        Optional<Model> model = modelService.findByModelNameAndBrandName(car.getModel().getName(), car.getModel().getBrand().getName());
        if (model == null || model.isEmpty()) {
            Model model2 = modelService.save(car.getModel());
            car.setModel(model2);
        } else {
            car.getModel().setId(model.get().getId());
            car.getModel().getBrand().setId(model.get().getBrand().getId());
        }

        Optional<Engine> engine = engineService.findByAll(car.getEngine().getNumberOfCylinders(),
                car.getEngine().getPower(), car.getEngine().getCapacity());
        if (engine == null || engine.isEmpty()) {
            Engine engine2 = engineService.save(car.getEngine());
            car.setEngine(engine2);
        } else {
            car.getEngine().setId(engine.get().getId());
        }

        if (car.getOwner() == null) {
            car.setOwner(userService.getCurrentUser());
        } else {
            car.setOwner(userService.save(car.getOwner()));
        }
        Car car2;
        try {
            car2 = carRepository.save(car);
        } catch (Exception e) {
            throw e;
        }
        return car2;
    }

    public List<Car> findCarsOfOwner(User user) {
        return carRepository.findAllByOwner(user);
    }

    public List<Car> findAllWhere(String licensePlate) {
        return carRepository.findUsersByKeyword(licensePlate);
    }

    public List<Car> findAllWhereOwner(String licensePlate, User user) {
        return carRepository.findUsersByKeywordForOwner(licensePlate, user.getId());
    }

    public Optional<Car> findByLicensePlate(String licensePlate) {
        return carRepository.findByLicensePlate(licensePlate);
    }

    public List<Car> findAll() {
        return carRepository.findAll();
    }

    public List<Car> findAllASC() {
        return carRepository.findAll(Sort.by(Sort.Direction.ASC, "licensePlate"));
    }

    public List<Car> findAllDESC() {
        return carRepository.findAll(Sort.by(Sort.Direction.DESC, "licensePlate"));
    }

    public Car update(Car car) {
        carRepository.findById(car.getId()).ifPresent(carRepository::save);
        return carRepository.save(car);
    }

    public boolean delete(Long id) {
        Optional<Car> optionalCar = carRepository.findById(id);
        if (optionalCar.isPresent()) {
            carRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Color getColorFromColorName(String name) {
        if (name == null) {
            return null;
        }
        Color color = null;
        switch (name.toUpperCase()) {
            case "BLACK":
                color = Color.BLACK;
                break;
            case "BLUE":
                color = Color.BLUE;
                break;
            case "BROWN":
                color = Color.BROWN;
                break;
            case "GREY":
                color = Color.GREY;
                break;
            case "GREEN":
                color = Color.GREEN;
                break;
            case "ORANGE":
                color = Color.ORANGE;
                break;
            case "PINK":
                color = Color.PINK;
                break;
            case "PURPLE":
                color = Color.PURPLE;
                break;
            case "RED":
                color = Color.RED;
                break;
            case "SILVER":
                color = Color.SILVER;
                break;
            case "WHITE":
                color = Color.WHITE;
                break;
            case "YELLOW":
                color = Color.YELLOW;
                break;
            default:
                throw new EntityNotFoundException("Bad input for color");
        }
        return color;
    }

    public Transmission getTransmissionFromTransmissionName(String name) {
        if (name == null) {
            return null;
        }
        Transmission transmission = null;
        switch (name.toUpperCase()) {
            case "AUTOMATIC":
                transmission = Transmission.AUTOMATIC;
                break;
            case "MANUAL":
                transmission = Transmission.MANUAL;
                break;
            default:
                throw new EntityNotFoundException("Bad input for transmission");
        }
        return transmission;
    }
}

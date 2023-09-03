package com.mechanics_store.controller.mapper;

import com.mechanics_store.controller.dto.CarDTO;
import com.mechanics_store.model.Car;
import com.mechanics_store.service.CarService;
import org.springframework.stereotype.Component;

/**
 *
 * @author Nebojsa Brankovic
 */
@Component
public class CarMapper implements Mapper<Car, CarDTO> {

    private ModelMapper modelMapper;

    private EngineMapper engineMapper;

    private UserMapper userMapper;

    private CarService carService;

    public CarMapper(ModelMapper modelMapper, EngineMapper engineMapper, CarService carService, UserMapper userMapper) {
        this.modelMapper = modelMapper;
        this.engineMapper = engineMapper;
        this.carService = carService;
        this.userMapper = userMapper;
    }

    @Override
    public CarDTO entityToDTO(Car car) {
        if (car == null) {
            return null;
        }
        return new CarDTO(car.getId(), car.getLicensePlate(), car.getYear(), car.getEngineNumber(),
                car.getChassisNumber(), car.getColor().toString(), car.getTransmission().toString(),
                modelMapper.entityToDTO(car.getModel()), engineMapper.entityToDTO(car.getEngine()),
                userMapper.entityToDTO(car.getOwner()));
    }

    @Override
    public Car DTOToEntity(CarDTO carDTO) {
        if (carDTO == null) {
            return null;
        }
        return new Car(carDTO.licensePlate(), carDTO.year(), carDTO.engineNumber(), carDTO.chassisNumber(),
                carService.getColorFromColorName(carDTO.color()), carService.getTransmissionFromTransmissionName(carDTO.transmission()),
                modelMapper.DTOToEntity(carDTO.model()), engineMapper.DTOToEntity(carDTO.engine()), userMapper.DTOToEntity(carDTO.owner()));
    }
}

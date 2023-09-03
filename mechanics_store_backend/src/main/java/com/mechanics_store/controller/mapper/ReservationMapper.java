package com.mechanics_store.controller.mapper;

import com.mechanics_store.controller.dto.ReservationDTO;
import com.mechanics_store.model.Reservation;
import com.mechanics_store.service.ReservationService;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.springframework.stereotype.Component;

/**
 *
 * @author Nebojsa Brankovic
 */
@Component
public class ReservationMapper implements Mapper<Reservation, ReservationDTO> {

    private CarMapper carMapper;

    private UserMapper userMapper;

    private ReservationService reservationService;

    public ReservationMapper(CarMapper carMapper, UserMapper userMapper, ReservationService reservationService) {
        this.carMapper = carMapper;
        this.userMapper = userMapper;
        this.reservationService = reservationService;
    }

    @Override
    public ReservationDTO entityToDTO(Reservation reservation) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy HH:mm");
        String date = dateFormat.format(reservation.getDate());
        return new ReservationDTO(reservation.getId(), date, carMapper.entityToDTO(reservation.getCar()),
                userMapper.entityToDTO(reservation.getMechanic()));
    }

    @Override
    public Reservation DTOToEntity(ReservationDTO reservationDTO) {
        if (reservationDTO.date().length() < 14) {
            throw new IllegalArgumentException("Date is not complete.");
        }
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy HH:mm");
        Date date = null;
        try {
            date = dateFormat.parse(reservationDTO.date());
        } catch (ParseException ex) {
            System.out.println(ex.getMessage());
        }

        return new Reservation(date, carMapper.DTOToEntity(reservationDTO.car()), userMapper.DTOToEntity(reservationDTO.mechanic()));
    }
}

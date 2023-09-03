package com.mechanics_store.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Represents entity in database called car.
 *
 * @author Nebojsa Brankovic
 */
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@EqualsAndHashCode
@Entity(name = "reservation")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "reservation_seq")
    @SequenceGenerator(name = "reservation_seq", sequenceName = "reservation_seq", initialValue = 1)
    private Long id;

    private Date date;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "car_id", referencedColumnName = "id")
    private Car car;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "mechanic_id", referencedColumnName = "id")
    private User mechanic;

    public Reservation(Date date, Car car, User mechanic) {
        this.date = date;
        this.car = car;
        this.mechanic = mechanic;
    }

    public void setMechanic(User mechanic) {
        this.mechanic = mechanic;
    }

    @Override
    public String toString() {
        return "Reservation{" + "id: " + this.id + ", date: " + this.date + ", car {" + this.car + "}, mechanic {" + this.mechanic + "}}";
    }
    
    
    
}

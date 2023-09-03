package com.mechanics_store.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Represents entity in database called engine.
 *
 * @author Nebojsa Brankovic
 */
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@EqualsAndHashCode
@Entity(name = "engine")
public class Engine {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "engine_seq")
    @SequenceGenerator(name = "engine_seq", sequenceName = "engine_seq", initialValue = 1)
    private long id;

    @NotNull(message = "Number of cylinders must be filled")
    private int numberOfCylinders;

    @NotNull(message = "Power of an engine must be filled")
    private int power;

    @NotNull(message = "Capacity of an engine must be filled")
    private double capacity;

    public Engine(int numberOfCylinders, int power, double capacity) {
        this.numberOfCylinders = numberOfCylinders;
        this.power = power;
        this.capacity = capacity;
    }

    @Override
    public String toString() {
        return "Engine{" + "id: " + this.id + ", numberOfCylinders:" + this.numberOfCylinders + ", power:" + this.power + ", capacity:" + this.capacity + '}';
    }

}

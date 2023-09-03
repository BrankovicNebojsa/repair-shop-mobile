package com.mechanics_store.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;

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
@Entity(name = "car")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "car_seq")
    @SequenceGenerator(name = "car_seq", sequenceName = "car_seq", initialValue = 1)
    private Long id;

    @NaturalId
    @NotBlank
    private String licensePlate;

    @NotNull
    private Integer year;

    @NotBlank
    private String engineNumber;

    @NotBlank
    private String chassisNumber;

    @Enumerated(EnumType.STRING)
    private Color color;

    @Enumerated(EnumType.STRING)
    private Transmission transmission;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "model_id", referencedColumnName = "id")
    private Model model;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "engine_id", referencedColumnName = "id")
    private Engine engine;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "owner_id", referencedColumnName = "id")
    private User owner;

    public Car(String licensePlate, Integer year, String engineNumber, String chassisNumber, Color color, Transmission transmission, Model model, Engine engine, User owner) {
        this.licensePlate = licensePlate;
        this.year = year;
        this.engineNumber = engineNumber;
        this.chassisNumber = chassisNumber;
        this.color = color;
        this.transmission = transmission;
        this.model = model;
        this.engine = engine;
        this.owner = owner;
    }

    @Override
    public String toString() {
        return "Car{" + "id: " + this.id + ", licensePlate: " + this.licensePlate + ", year: " + this.year + ", engineNumber: " + this.engineNumber
                + ", chassisNumber: " + this.chassisNumber + ", color: " + this.color + ", transmission: " + this.transmission + ", model {" + this.model
                + " }, engine { " + this.engine.toString() + " }, owner {" + this.owner + " } }";
    }

}

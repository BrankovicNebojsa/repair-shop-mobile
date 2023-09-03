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
 * Represents entity in database called price.
 *
 * @author Nebojsa Brankovic
 */
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@EqualsAndHashCode
@Entity(name = "price")
public class Price {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "price_seq")
    @SequenceGenerator(name = "price_seq", sequenceName = "price_seq", initialValue = 1)
    private long id;

    @NotNull(message = "Name of service must be filled")
    private String nameOfService;

    @NotNull(message = "Price must be filled")
    private double price;

    public Price(String nameOfService, double price) {
        this.nameOfService = nameOfService;
        this.price = price;
    }

    @Override
    public String toString() {
        return "Price{" + "id: " + this.id + ", nameOfService: " + this.nameOfService + ", price:" + this.price + '}';
    }

}

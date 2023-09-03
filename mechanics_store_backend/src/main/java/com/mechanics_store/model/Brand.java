package com.mechanics_store.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Represents entity in database called brand.
 *
 * @author Nebojsa Brankovic
 */
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@EqualsAndHashCode
@Entity(name = "brand")
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "brand_seq")
    @SequenceGenerator(name = "brand_seq", sequenceName = "brand_seq", initialValue = 1)
    private long id;

    @NotBlank(message = "Name of a brand must be filled")
    private String name;

    public Brand(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Brand{ id: " + this.id + " name: " + this.name + "}";
    }

}

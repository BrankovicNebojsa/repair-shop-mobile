package com.mechanics_store.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Represents entity in database called model.
 *
 * @author Nebojsa Brankovic
 */
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@EqualsAndHashCode
@Entity(name = "model")
public class Model {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "model_seq")
    @SequenceGenerator(name = "model_seq", sequenceName = "model_seq", initialValue = 1)
    private long id;

    @NotBlank(message = "Name of a model must be filled")
    private String name;

    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "brand_id", referencedColumnName = "id")
    private Brand brand;

    public Model(String name, Brand brand) {
        this.name = name;
        this.brand = brand;
    }

    @Override
    public String toString() {
        return "Model{" + "id: " + this.id + ", name: " + this.name + ", brand {" + this.brand.toString() + "}}";
    }

}

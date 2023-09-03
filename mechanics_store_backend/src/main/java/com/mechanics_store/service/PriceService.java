package com.mechanics_store.service;

import com.mechanics_store.model.Price;
import com.mechanics_store.repository.PriceRepository;
import jakarta.persistence.EntityExistsException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Contains business logic for a Price class
 *
 * Class that's used to control and manipulate data related to price class.
 * Enables creating, reading, updating and deleting a price of some service.
 *
 * @author Nebojsa Brankovic
 */
@Service
public class PriceService {

    private final PriceRepository priceRepository;

    @Autowired
    public PriceService(PriceRepository priceRepository) {
        this.priceRepository = priceRepository;
    }

    public Price save(Price price) {
        Optional<Price> priceFromDB = priceRepository.findByNameOfServiceAndPrice(price.getNameOfService(), price.getPrice());
        if (priceFromDB == null || priceFromDB.isEmpty()) {
            Price price2 = priceRepository.save(price);
            return price2;
        } else {
            EntityExistsException e = new EntityExistsException("Price with that data already exists");
            throw e;
        }
    }

    public Optional<Price> findById(Long id) {
        return priceRepository.findById(id);
    }

    public Optional<Price> findByAll(String nameOfService, double price) {
        return priceRepository.findByNameOfServiceAndPrice(nameOfService, price);
    }

    public List<Price> findAll() {
        return priceRepository.findAll();
    }

    public Price update(Price price) {
        priceRepository.findById(price.getId()).ifPresent(priceRepository::save);
        return priceRepository.save(price);
    }

    public boolean delete(Long id) {
        Optional<Price> optionalPrice = priceRepository.findById(id);
        if (optionalPrice.isPresent()) {
            priceRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

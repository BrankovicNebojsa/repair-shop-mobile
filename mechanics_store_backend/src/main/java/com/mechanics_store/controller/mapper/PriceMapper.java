package com.mechanics_store.controller.mapper;

import com.mechanics_store.controller.dto.PriceDTO;
import com.mechanics_store.model.Price;
import org.springframework.stereotype.Component;

/**
 *
 * @author Nebojsa Brankovic
 */
@Component
public class PriceMapper implements Mapper<Price, PriceDTO> {

    @Override
    public PriceDTO entityToDTO(Price price) {
        return new PriceDTO(price.getId(), price.getNameOfService(), price.getPrice());
    }

    @Override
    public Price DTOToEntity(PriceDTO priceDTO) {
        if (priceDTO == null) {
            return null;
        }
        return new Price(priceDTO.nameOfService(), priceDTO.price());
    }
}

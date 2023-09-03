package com.mechanics_store.service;

import com.mechanics_store.exception.EntityAlreadyExistsException;
import com.mechanics_store.model.Brand;
import com.mechanics_store.model.Model;
import com.mechanics_store.repository.ModelRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Contains business logic for a Model class
 *
 * Class that's used to control and manipulate data related to model class.
 * Enables creating, reading, updating and deleting a model.
 *
 * @author Nebojsa Brankovic
 */
@Service
public class ModelService {

    private final ModelRepository modelRepository;

    private final BrandService brandService;

    @Autowired
    public ModelService(ModelRepository modelRepository, BrandService brandService) {
        this.modelRepository = modelRepository;
        this.brandService = brandService;
    }

    public Model save(Model model) {
        Optional<Brand> brand = brandService.findByName(model.getBrand().getName());
        if (brand == null || brand.isEmpty()) {
            Brand brand2 = brandService.save(model.getBrand());
            model.setBrand(brand2);
        } else {
            model.getBrand().setId(brand.get().getId());
        }
        Optional<Model> modelFromDB = modelRepository.findByNameAndBrandId(model.getName(), model.getBrand().getId());
        if (modelFromDB == null || modelFromDB.isEmpty()) {
            Model model2 = modelRepository.save(model);
            return model2;
        } else {
            EntityAlreadyExistsException e = new EntityAlreadyExistsException("Model with that name already exists");
            throw e;
        }

    }

    public Optional<Model> findByModelNameAndBrandName(String modelName, String brandName) {
        Optional<Brand> oBrand = brandService.findByName(brandName);
        if (oBrand.isEmpty()) {
            return null;
        }

        return modelRepository.findByNameAndBrandId(modelName, oBrand.get().getId());
    }

    public List<Model> findAll() {
        return modelRepository.findAll();
    }

    public Model update(Model model) {
        modelRepository.findById(model.getId()).ifPresent(modelRepository::save);
        return modelRepository.save(model);
    }

    public boolean delete(Long id) {
        Optional<Model> optionalModel = modelRepository.findById(id);
        if (optionalModel.isPresent()) {
            modelRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

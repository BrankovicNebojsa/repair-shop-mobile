import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarsService } from '../cars.service';
import { Brand } from 'src/app/brands/brand.model';
import { BrandsService } from 'src/app/brands/brands.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  brands: Brand[] = [new Brand('1', 'Audi', '1')];
  addCarForm: FormGroup;

  constructor(
    private carService: CarsService,
    private brandService: BrandsService
  ) {
    this.addCarForm = new FormGroup({
      license_plate: new FormControl(null, Validators.required),
      brand_name: new FormControl(null, Validators.required),
      model_name: new FormControl(null, Validators.required),
      year: new FormControl(null, Validators.required),
      transmission: new FormControl(null, Validators.required),
      color: new FormControl(null, Validators.required),
      engine_horse_power: new FormControl(null, Validators.required),
      engine_capacity: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.brandService.getBrands().subscribe(response => {
        this.brands = response;
    });
  }
  
  onAddCar() {
    this.carService
      .addCar(
        this.addCarForm.get('license_plate')?.value,
        this.addCarForm.get('brand_name')?.value,
        this.addCarForm.get('model_name')?.value,
        this.addCarForm.get('year')?.value,
        this.addCarForm.get('transmission')?.value,
        this.addCarForm.get('color')?.value,
        this.addCarForm.get('engine_horse_power')?.value,
        this.addCarForm.get('engine_capacity')?.value
      )
      .subscribe((res) => {
        console.log(res);
      });
    this.resetForm();
  }

  resetForm() {
    this.addCarForm = new FormGroup({
      license_plate: new FormControl(null, Validators.required),
      brand_name: new FormControl(null, Validators.required),
      model_name: new FormControl(null, Validators.required),
      year: new FormControl(null, Validators.required),
      transmission: new FormControl(null, Validators.required),
      color: new FormControl(null, Validators.required),
      engine_horse_power: new FormControl(null, Validators.required),
      engine_capacity: new FormControl(null, Validators.required),
    });
  }
}

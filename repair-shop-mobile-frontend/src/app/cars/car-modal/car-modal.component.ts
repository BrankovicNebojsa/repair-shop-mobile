import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { CarsService } from '../cars.service';
import { Car } from '../car.model';
import { take } from 'rxjs';
import { Brand } from 'src/app/brands/brand.model';
import { BrandsService } from 'src/app/brands/brands.service';

@Component({
  selector: 'app-car-modal',
  templateUrl: './car-modal.component.html',
  styleUrls: ['./car-modal.component.scss'],
})
export class CarModalComponent implements OnInit {
  brands: Brand[] = [new Brand('1', 'Audi', '1')];
  car: Car;

  editCarForm: FormGroup;

  title: string = 'Edit car';

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private carService: CarsService,
    private brandService: BrandsService
  ) {
    this.editCarForm = new FormGroup({
      license_plate: new FormControl(null, [Validators.required]),
      brand_name: new FormControl(null, [Validators.required]),
      model_name: new FormControl(null, [Validators.required]),
      year: new FormControl(null, [Validators.required]),
      transmission: new FormControl('', [Validators.required]),
      color: new FormControl(null, [Validators.required]),
      engine_horse_power: new FormControl(null, [Validators.required]),
      engine_capacity: new FormControl(null, [Validators.required]),
    });
    this.car = new Car(
      '1',
      'Audi',
      'nesto',
      'nesto',
      'nesto',
      'nesto',
      'nesto',
      'nesto',
      'nesto',
      'nesto'
    );
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('carId')) {
        this.navCtrl.navigateBack('/cars/tabs/explore');
        return;
      }

      this.carService.getCar(paramMap.get('carId')).subscribe((car) => {
        this.car = car;
      });
    });

    this.brandService.getBrands().subscribe((response) => {
      this.brands = response;
    });
  }

  isFormValid() {
    if (this.editCarForm.valid) {
      return false;
    } else {
      return true;
    }
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    if (!this.editCarForm.valid) {
      return;
    }

    this.modalCtrl.dismiss(
      {
        carData: {
          license_plate: this.editCarForm.get('license_plate')?.value,
          brand_name: this.editCarForm.get('brand_name')?.value,
          model_name: this.editCarForm.get('model_name')?.value,
          year: this.editCarForm.get('year')?.value,
          transmission: this.editCarForm.get('transmission')?.value,
          color: this.editCarForm.get('color')?.value,
          engine_horse_power: this.editCarForm.get('engine_horse_power')?.value,
          engine_capacity: this.editCarForm.get('engine_capacity')?.value,
        },
      },
      'confirm'
    );
  }
}

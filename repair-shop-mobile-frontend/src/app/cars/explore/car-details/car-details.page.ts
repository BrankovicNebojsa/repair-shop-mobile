import { Component, OnInit } from '@angular/core';
import { Car } from '../../car.model';
import { ActivatedRoute } from '@angular/router';
import {
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { CarsService } from '../../cars.service';
import { CarModalComponent } from '../../car-modal/car-modal.component';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.page.html',
  styleUrls: ['./car-details.page.scss'],
})
export class CarDetailsPage implements OnInit {
  car: Car;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private carService: CarsService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {
    console.log(
      this.carService.getCar(this.route.snapshot.params?.['brandId'])
    );
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
  }

  async onEditCar() {
    const modal = await this.modalCtrl.create({
      component: CarModalComponent,
      componentProps: {
        title: 'Edit car',
        license_plate: this.car.license_plate,
        brand_name: this.car.brand_name,
        model_name: this.car.model_name,
        year: this.car.year,
        transmission: this.car.transmission,
        color: this.car.color,
        engine_horse_power: this.car.engine_horse_power,
        engine_capacity: this.car.engine_capacity,
      },
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.carService
        .editCar(
          this.car.id!,
          data.carData.license_plate,
          data.carData.brand_name,
          data.carData.model_name,
          data.carData.year,
          data.carData.transmission,
          data.carData.color,
          data.carData.engine_horse_power,
          data.carData.engine_capacity,
          this.car.userId
        )
        .subscribe((res) => {
          this.car.license_plate = data.carData.license_plate;
          this.car.brand_name = data.carData.brand_name;
          this.car.model_name = data.carData.model_name;
          this.car.year = data.carData.year;
          this.car.transmission = data.carData.transmission;
          this.car.color = data.carData.color;
          this.car.engine_horse_power = data.carData.engine_horse_power;
          this.car.engine_capacity = data.carData.engine_capacity;
        });
    }
  }
}

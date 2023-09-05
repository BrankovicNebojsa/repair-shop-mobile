import { Component, Input, OnInit } from '@angular/core';
import { Car } from '../car.model';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { CarsService } from '../cars.service';

@Component({
  selector: 'app-car-element',
  templateUrl: './car-element.component.html',
  styleUrls: ['./car-element.component.scss'],
})
export class CarElementComponent implements OnInit {
  @Input() car: Car = {
    id: '4',
    license_plate: 'BG1468OI',
    brand_name: 'Volkswagen',
    model_name: 'Polo',
    year: '2007',
    transmission: 'MANUAL',
    color: 'Blue',
    engine_horse_power: '70',
    engine_capacity: '1422',
    userId: '1',
  };
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private carService: CarsService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  openAlert() {
    this.alertController
      .create({
        header: 'Delete car',
        message: 'Are you sure you want to delete this car?',
        buttons: [
          {
            text: 'Delete',
            handler: () => {
              this.deleteCar();
              console.log('Deleted!');
            },
          },
          {
            text: 'Cancel',
            handler: () => {
              console.log('Canceled!');
            },
          },
        ],
      })
      .then((alert: HTMLIonAlertElement) => {
        alert.present();
      });
  }

  async deleteCar() {
    const loading = await this.loadingCtrl.create({ message: 'Deleting...' });
    await loading.present();

    this.carService.deleteCar(this.car.id!).subscribe(async () => {
      await loading.dismiss();
      this.navCtrl.navigateBack('/cars/tabs/explore');
    });
  }
}

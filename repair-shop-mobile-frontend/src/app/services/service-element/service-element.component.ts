import { Component, Input, OnInit } from '@angular/core';
import { Service } from '../service.model';
import { ActivatedRoute } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-service-element',
  templateUrl: './service-element.component.html',
  styleUrls: ['./service-element.component.scss'],
})
export class ServiceElementComponent implements OnInit {
  @Input() service: Service = {
    id: '4',
    name: 'Oil change',
    price: '79.99',
    userId: '1',
  };
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private sericeService: ServicesService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  openAlert() {
    this.alertController
      .create({
        header: 'Delete service',
        message: 'Are you sure you want to delete this service?',
        buttons: [
          {
            text: 'Delete',
            handler: () => {
              this.deleteService();
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

  async deleteService() {
    const loading = await this.loadingCtrl.create({ message: 'Deleting...' });
    await loading.present();

    this.sericeService.deleteService(this.service.id!).subscribe(async () => {
      await loading.dismiss();
      this.navCtrl.navigateBack('/services/tabs/explore');
    });
  }
}

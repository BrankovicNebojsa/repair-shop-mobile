import { Component, OnInit } from '@angular/core';
import { Service } from '../../service.model';
import { ActivatedRoute } from '@angular/router';
import {
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { ServicesService } from '../../services.service';
import { ServiceModalComponent } from '../../service-modal/service-modal.component';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.page.html',
  styleUrls: ['./service-details.page.scss'],
})
export class ServiceDetailsPage implements OnInit {
  service: Service;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private serviceService: ServicesService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {
    console.log(
      this.serviceService.getService(this.route.snapshot.params?.['serviceId'])
    );
    this.service = new Service('1', 'Oil change', '79.99', '1');
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('serviceId')) {
        this.navCtrl.navigateBack('/services/tabs/explore');
        return;
      }

      this.serviceService
        .getService(paramMap.get('serviceId'))
        .subscribe((service) => {
          this.service = service;
        });
    });
  }

  async onEditService() {
    const modal = await this.modalCtrl.create({
      component: ServiceModalComponent,
      componentProps: {
        title: 'Edit service',
        name: this.service.name,
        price: this.service.price,
      },
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.serviceService
        .editService(
          this.service.id!,
          data.serviceData.name,
          data.serviceData.price,
          this.service.userId
        )
        .subscribe((res) => {
          this.service.name = data.serviceData.name;
          this.service.price = data.serviceData.price;
        });
    }
  }
}

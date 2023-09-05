import { Component, OnInit } from '@angular/core';
import { Service } from '../service.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-service-modal',
  templateUrl: './service-modal.component.html',
  styleUrls: ['./service-modal.component.scss'],
})
export class ServiceModalComponent implements OnInit {
  service: Service;

  editServiceForm: FormGroup;

  title: string = 'Edit service';

  constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private serviceService: ServicesService
  ) {
    this.editServiceForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
    });
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

  isFormValid() {
    if (this.editServiceForm.valid) {
      return false;
    } else {
      return true;
    }
  }

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onSubmit() {
    if (!this.editServiceForm.valid) {
      return;
    }

    this.modalCtrl.dismiss(
      {
        serviceData: {
          name: this.editServiceForm.get('name')?.value,
          price: this.editServiceForm.get('price')?.value,
        },
      },
      'confirm'
    );
  }
}

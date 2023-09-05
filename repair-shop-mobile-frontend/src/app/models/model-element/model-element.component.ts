import { Component, Input, OnInit } from '@angular/core';
import { Model } from '../model.model';
import { ActivatedRoute } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { ModelsService } from '../models.service';

@Component({
  selector: 'app-model-element',
  templateUrl: './model-element.component.html',
  styleUrls: ['./model-element.component.scss'],
})
export class ModelElementComponent implements OnInit {
  @Input() model: Model = {
    id: '4',
    brand_name: 'Volkswagen',
    model_name: 'Polo',
    userId: '1',
  };
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private modelService: ModelsService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  openAlert() {
    this.alertController
      .create({
        header: 'Delete model',
        message: 'Are you sure you want to delete this model?',
        buttons: [
          {
            text: 'Delete',
            handler: () => {
              this.deleteModel();
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

  async deleteModel() {
    const loading = await this.loadingCtrl.create({ message: 'Deleting...' });
    await loading.present();

    this.modelService.deleteModel(this.model.id!).subscribe(async () => {
      await loading.dismiss();
      this.navCtrl.navigateBack('/models/tabs/explore');
    });
  }
}

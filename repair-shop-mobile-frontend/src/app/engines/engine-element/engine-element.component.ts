import { Component, Input, OnInit } from '@angular/core';
import { Engine } from '../engine.model';
import { ActivatedRoute } from '@angular/router';
import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { EnginesService } from '../engines.service';

@Component({
  selector: 'app-engine-element',
  templateUrl: './engine-element.component.html',
  styleUrls: ['./engine-element.component.scss'],
})
export class EngineElementComponent implements OnInit {
  @Input() engine: Engine = {
    id: '4',
    horse_power: '70',
    engine_capacity: '1422',
    number_of_cylinders: '3',
    userId: '1',
  };
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private engineService: EnginesService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  openAlert() {
    this.alertController
      .create({
        header: 'Delete engine',
        message: 'Are you sure you want to delete this engine?',
        buttons: [
          {
            text: 'Delete',
            handler: () => {
              this.deleteEngine();
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

  async deleteEngine() {
    const loading = await this.loadingCtrl.create({ message: 'Deleting...' });
    await loading.present();

    this.engineService.deleteEngine(this.engine.id!).subscribe(async () => {
      await loading.dismiss();
      this.navCtrl.navigateBack('/engines/tabs/explore');
    });
  }
}

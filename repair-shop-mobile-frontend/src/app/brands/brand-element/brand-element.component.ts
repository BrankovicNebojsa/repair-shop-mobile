import { Component, Input, OnInit } from '@angular/core';
import { Brand } from '../brand.model';
import {
  AlertController,
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { BrandsService } from '../brands.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brand-element',
  templateUrl: './brand-element.component.html',
  styleUrls: ['./brand-element.component.scss'],
})
export class BrandElementComponent implements OnInit {
  @Input() brand: Brand = { id: '4', name: 'VW', userId: '0' };
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private brandService: BrandsService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  openAlert() {
    this.alertController
      .create({
        header: 'Delete brand',
        message: 'Are you sure you want to delete this brand?',
        buttons: [
          {
            text: 'Delete',
            handler: () => {
              this.deleteBrand();
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

  async deleteBrand() {
    const loading = await this.loadingCtrl.create({ message: 'Deleting...' });
    await loading.present();

    this.brandService.deleteBrand(this.brand.id!).subscribe(async () => {
      await loading.dismiss();
      this.navCtrl.navigateBack('/brands/tabs/explore');
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Brand } from '../../brand.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BrandsService } from '../../brands.service';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { BrandModalComponent } from '../../brand-modal/brand-modal.component';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.page.html',
  styleUrls: ['./brand-details.page.scss'],
})
export class BrandDetailsPage implements OnInit {
  brand: Brand;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private brandService: BrandsService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) {
    console.log(
      this.brandService.getBrand(this.route.snapshot.params?.['brandId'])
    );
    this.brand = new Brand('1', 'Audi', 'nesto');
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('brandId')) {
        this.navCtrl.navigateBack('/brands/tabs/explore');
        return;
      }

      this.brandService
        .getBrand(paramMap.get('brandId'))
        .subscribe((brand) => {
          this.brand = brand;
        });
    });
  }

  async onEditQuote() {
    const modal = await this.modalCtrl.create({
      component: BrandModalComponent,
      componentProps: {title: 'Edit quote', name: this.brand.name}
    });

    modal.present();

    const {data, role} = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.brandService
        .editBrand(
          this.brand.id!,
          data.brandData.name,
          this.brand.userId)
        .subscribe((res) => {
          this.brand.name = data.brandData.name;
        });
    }
  }
}
 
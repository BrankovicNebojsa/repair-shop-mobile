import { Component, OnInit } from '@angular/core';
import { Brand } from '../../brand.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BrandsService } from '../../brands.service';
import { NavController } from '@ionic/angular';

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
    private brandService: BrandsService
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
}

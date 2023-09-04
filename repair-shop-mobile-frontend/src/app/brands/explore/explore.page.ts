import { Component, OnDestroy, OnInit } from '@angular/core';
import { Brand } from '../brand.model';
import { BrandsService } from '../brands.service';
import { MenuController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit, OnDestroy {
  brands: Brand[];
  private brandSub: Subscription | undefined;

  constructor(
    private menuCtr: MenuController,
    private brandService: BrandsService
  ) {
    this.brands = this.brandService.brands;
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.brandSub = this.brandService.getBrands().subscribe((brands) => {
      this.brands = brands;
    });
  }

  ngOnDestroy() {
    if (this.brandSub) {
      this.brandSub.unsubscribe();
    }
  }
}

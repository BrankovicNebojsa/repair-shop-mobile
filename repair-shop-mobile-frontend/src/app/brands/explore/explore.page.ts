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
  brands: Brand[] | undefined;
  private brandSub: Subscription | undefined;

  constructor(
    private menuCtr: MenuController,
    private brandService: BrandsService
  ) {}

  ngOnInit() {
    this.brandSub = this.brandService.brands.subscribe((brands) => {
      this.brands = brands;
    });
    console.log(this.brands);
  }

  ionViewWillEnter() {
    this.brandService.getBrands().subscribe((brands) => {});
  }

  ngOnDestroy() {
    if (this.brandSub) {
      this.brandSub.unsubscribe();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Brand } from '../brand.model';
import { BrandsService } from '../brands.service';
import { MenuController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  brands: Brand[];

  constructor(
    private menuCtr: MenuController,
    private brandService: BrandsService
  ) {
    this.brands = this.brandService.brands;
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.brandService.getBrands().subscribe((brands) => {
      this.brands = brands;
    });
  }
}

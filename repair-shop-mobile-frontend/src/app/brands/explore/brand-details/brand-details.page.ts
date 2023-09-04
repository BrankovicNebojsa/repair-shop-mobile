import { Component, OnInit } from '@angular/core';
import { Brand } from '../../brand.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BrandsService } from '../../brands.service';

@Component({
  selector: 'app-brand-details',
  templateUrl: './brand-details.page.html',
  styleUrls: ['./brand-details.page.scss'],
})
export class BrandDetailsPage implements OnInit {
  brand: Brand;

  constructor(
    private route: ActivatedRoute,
    private brandService: BrandsService
  ) {
    this.brand = this.brandService.getBrand(
      this.route.snapshot.params?.['brandId']
    )!;
  }

  ngOnInit() {}
}

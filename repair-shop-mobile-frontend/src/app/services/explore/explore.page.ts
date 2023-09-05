import { Component, OnDestroy, OnInit } from '@angular/core';
import { Service } from '../service.model';
import { Subscription } from 'rxjs';
import { MenuController } from '@ionic/angular';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit, OnDestroy {
  services: Service[] | undefined;
  private serviceSub: Subscription | undefined;

  constructor(
    private menuCtr: MenuController,
    private serviceService: ServicesService
  ) {}

  ngOnInit() {
    this.serviceSub = this.serviceService.services.subscribe((services) => {
      this.services = services;
    });
  }

  ionViewWillEnter() {
    this.serviceService.getServices().subscribe((services) => {});
  }

  ngOnDestroy() {
    if (this.serviceSub) {
      this.serviceSub.unsubscribe();
    }
  }
}

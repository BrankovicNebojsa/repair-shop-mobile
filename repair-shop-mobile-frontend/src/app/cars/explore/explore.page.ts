import { Component, OnDestroy, OnInit } from '@angular/core';
import { Car } from '../car.model';
import { Subscription } from 'rxjs';
import { MenuController } from '@ionic/angular';
import { CarsService } from '../cars.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit, OnDestroy {
  cars: Car[] | undefined;
  private carSub: Subscription | undefined;
  userId: string | null = '';

  constructor(
    private menuCtr: MenuController,
    private carService: CarsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.userId.subscribe((userId) => {
      this.userId = userId;
    });
    
    this.carSub = this.carService.cars.subscribe((cars) => {
      this.cars = cars;
    });
  }

  ionViewWillEnter() {
    this.carService.getCars().subscribe((cars) => {});
  }

  ngOnDestroy() {
    if (this.carSub) {
      this.carSub.unsubscribe();
    }
  }
}

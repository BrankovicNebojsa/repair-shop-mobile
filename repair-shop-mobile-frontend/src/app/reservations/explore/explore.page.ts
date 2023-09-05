import { Component, OnInit } from '@angular/core';
import { Reservation } from '../reservation.model';
import { Subscription } from 'rxjs';
import { MenuController } from '@ionic/angular';
import { ReservationsService } from '../reservations.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  reservations: Reservation[] | undefined;
  private reservationsSub: Subscription | undefined;

  constructor(
    private menuCtr: MenuController,
    private reservationService: ReservationsService
  ) {}

  ngOnInit() {
    this.reservationsSub = this.reservationService.reservations.subscribe(
      (reservations) => {
        this.reservations = reservations;
      }
    );
  }

  ionViewWillEnter() {
    this.reservationService.getReservations().subscribe((reservations) => {});
  }

  ngOnDestroy() {
    if (this.reservationsSub) {
      this.reservationsSub.unsubscribe();
    }
  }
}

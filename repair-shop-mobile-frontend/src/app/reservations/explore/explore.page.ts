import { Component, OnInit } from '@angular/core';
import { Reservation } from '../reservation.model';
import { Subscription } from 'rxjs';
import { MenuController } from '@ionic/angular';
import { ReservationsService } from '../reservations.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {
  reservations: Reservation[] | undefined;
  private reservationsSub: Subscription | undefined;
  userId: string | null = '';

  constructor(
    private menuCtr: MenuController,
    private reservationService: ReservationsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.userId.subscribe((userId) => {
      this.userId = userId;
    });

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
